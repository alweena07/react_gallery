import React from "react"

import ImageList from "../ImageList/ImageList"
import ImageSearch from "../ImageSearch/ImageSearch"

const API_TOKEN = "21126086-0ddd1cdc81d64c96d17dae654"

class App extends React.Component {
  state = {
    images: [],
    error: null
  }
  handleMakeRequest = async (e) => {
    e.preventDefault()
    const searchValue = e.target.elements.searchValue.value
    const request = await fetch(`https://pixabay.com/api/?key=${API_TOKEN}&q=${searchValue}&per_page=15`)
    const results = await request.json()
    if (!searchValue) {
      this.setState({ error: "Please provide a value." })
    } else {
      this.setState({ images: results.hits, error: null })
    }
  }
  render() {
    return (
      <div>
        <ImageSearch handleMakeRequest={this.handleMakeRequest} />
        { 
          this.state.error !== null ? 
          <div style={{ color:"#fff", textAlign:"center" }}>{ this.state.error }</div> : 
          <ImageList images={this.state.images} /> 
        }
      </div>
    )
  }
}

export default App