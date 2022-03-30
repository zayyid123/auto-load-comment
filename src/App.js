import InfiniteScroll from 'react-infinite-scroll-component';
import React from 'react';
import './App.css';

function App() {
  const [items, setitems] = React.useState([])

  const [page, setpage] = React.useState(2)

  React.useEffect(() => {
    const getMyData = async() => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts/1/comments')

      const data = await res.json()
      setitems(data)
    }

    getMyData()
  }, [])

  const getData = async() => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${page}/comments`)

    const data = await res.json()
    return data
  }

  const fetchData = async() => {
    const dataFromServer = await getData();

    setitems([...items, ...dataFromServer])

    setpage(page+1)
  }
  

  return (
    <div style={{
      textAlign: 'center'
    }}>
      <h1>Infinite Scroll With jsonplaceholder</h1>

      <p>You can find all of this code in my github: <a href='https://github.com/zayyid123' style={{textDecoration: "none", color: 'blue'}}><b>zayyid123</b></a></p>

      <InfiniteScroll
        dataLength={items.length} 
        next={fetchData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        
      >
        {
          items.map((item, index) =>
            <div key={index} 
              style={{
                margin: 'auto',
                padding: '15px',
                boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                borderRadius: '10px',
                maxWidth: '350px',
                marginTop: '10px',
                backgroundColor: 'white'
                }}>
              <h3>{item.name.toUpperCase()}</h3>
              <h4>{item.email}</h4>
              <p>{item.body}</p>
            </div>
          )
        }
      </InfiniteScroll>
    </div>
  );
}

export default App;
