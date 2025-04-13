import h from './components/SearchBar/SearchBar.module.css'
import l from './components/LoadMoreBtn/LoadMoreBtn.module.css'
import c from './components/Loader/Loader.module.css'
import { useEffect, useState } from "react"
import SearchBar from "./components/SearchBar/SearchBar"
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { fetchResults } from "./services/api";
import Loader from './components/Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';
import  ErrorMessage  from "./components/ErrorMessage/ErrorMessage";
import { useRef } from 'react';
import Modal from 'react-modal';
import ImageModal from './components/ImageModal/ImageModal';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn'

const App = () => {
  Modal.setAppElement('#root');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const openModal = (imageUrl) => {
    console.log(imageUrl)
    setSelectedImage(imageUrl);
    setModalIsOpen(true);
  };
  
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('random');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const galleryRef = useRef(null);
  const handleLoadMore = () =>{
    setPage(prev => prev + 1);
    setQuery(prev => prev);
    setTimeout(() => {
    galleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 300);
  };
  const [loading, setLoading] = useState(false);
  const handleChangeQuery = newQuery => {
    setQuery(newQuery);
    setResults([]);
    setPage(1);
  }
  useEffect(() =>{
    const abortController = new AbortController();
    const getData = async() => {
      const signal = abortController.signal;
      try {
        setLoading(true);
        const data = await fetchResults(query, page, signal);
        setResults(prev => [...prev, ...data.results]);
        setTotalPages(data.total_pages)
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
      <Toaster position="top-right" reverseOrder={false}/>
      <div className={h.wrapper}>
        <SearchBar handleChangeQuery={handleChangeQuery} toast={toast}/>
      </div>
      {!loading && results.length === 0 && <ErrorMessage query={query}/>}
      <div ref={galleryRef}><ImageGallery  results={filteredResults} onImageClick={openModal}/></div>
      <ImageModal isOpen={modalIsOpen} imageUrl={selectedImage} onClose={closeModal}/>
      {loading && <div className={c.wrapper}><Loader/></div>}
      {results.length > 0 && page < totalPages &&  <div className={l.wrapper}><LoadMoreBtn onClick={handleLoadMore}/></div>}
    </>
  )
}

export default App
