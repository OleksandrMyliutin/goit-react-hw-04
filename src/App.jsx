import h from './components/SearchBar/SearchBar.module.css'
import l from './components/Loader/Loader.module.css'
import c from './components/ClipLoader/ClipLoader.module.css'
import { useEffect, useState } from "react"
import SearchBar from "./components/SearchBar/SearchBar"
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { fetchResults } from "./services/api";
import Loader from './components/Loader/Loader';
import ClipLoader from "react-spinners/ClipLoader";



const App = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('cats');
  const [page, setPage] = useState(1);
  const handleLoadMore = () =>{
    setPage(prev => prev + 1);
  };
  const [loading, setLoading] = useState(false);
  const handleChangeQuery = newQuery => {
    setQuery(newQuery);
  }
  useEffect(() =>{
    const abortController = new AbortController();
    const getData = async() => {
      const signal = abortController.signal;
      try {
        setLoading(true);
        const data = await fetchResults(query, page, signal);
        setResults(prev => [...prev, ...data.results]);
      } catch (error) {
        if (error.name !== 'CanceledError') {
          console.error(error);
        }
      } finally{
        setLoading(false);
      }
    };
    getData();
    return () => {
      abortController.abort();
    };
  }, [query, page]);

  const bannedWords = ["russia", "russian", "moscow"];
  const filteredResults = results.filter(item =>
    !bannedWords.some(word =>
      item.alt_description?.toLowerCase().includes(word) ||
      item.description?.toLowerCase().includes(word) ||
      item.slug?.toLowerCase().includes(word) ||
      item.location?.toLowerCase().includes(word) ||
      item.user?.location?.toLowerCase().includes(word) ||
      item.user?.name?.toLowerCase().includes(word)
    )
  );

  return (
    <>
      <div className={h.wrapper}>
        <SearchBar handleChangeQuery={handleChangeQuery}/>
      </div>
      {loading && <div className={c.wrapper}><ClipLoader color={"#00ffff"} loading={loading} size={60} aria-label="SyncLoader" data-testid="loader"/></div>}
      <ImageGallery  results={filteredResults}/>
      {results.length > 0 && <div className={l.wrapper}><Loader onClick={handleLoadMore}/></div>}
    </>
  )
}

export default App
