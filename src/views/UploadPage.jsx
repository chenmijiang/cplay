import React from 'react'

import Style from '../assets/scss/upload.module.scss'

function Upload() {
  return (
    <div className={Style.upload_page_body}>
      <div className={Style.upload_page_contain}>
        <div className={Style.upload_handle}>
          <div className={Style.upload_file}>
            <i className={Style.upload_icon}></i>
            <input type="file" title="music file" />
          </div>
          <div className={Style.upload_progress}>
            <div className="progress_line"></div>
          </div>
          <button className={Style.upload_button}>upload</button>
        </div>
        <div className="upload_file_show">
          <table></table>
          <div className="pagination"></div>
        </div>
      </div>
    </div>
  )
}

export default Upload
