import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";
const Loader = ({loading}) => {
  return (
    <div>
      <ClipLoader color={"#00ffff"} loading={loading} size={60} aria-label="SyncLoader" data-testid="loader"/>
    </div>
  )
}

export default Loader
