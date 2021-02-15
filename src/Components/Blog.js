import React from 'react'
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import {setBlogData , setSearchInput, selectSearchInput} from '../features/userSlice'
import '../styling/blog.css'

const Blog = () => {
    const dispatch = useDispatch();
    const searchInput = useSelector(selectSearchInput);
    const apiToken ='301649e90404b2835a3b1b0443252e9c'
    const blog_url = `https://gnews.io/api/v4/search?q=${searchInput}&token=${apiToken}`;
    const [blog, setBlog] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(blog_url)
            .then((response) => {
                dispatch(setBlogData(response.data));
                setBlog(response.data);
                setLoading(false);
            }).catch((error) => {
                console.log(error)
            })
    },[searchInput]);


    return (
        <div className="blog__page">
            <h1 className="blog__page__header">Blogs</h1>
            {loading ? <h1 className="loading">Loading...</h1> : ""}
            <div className="blogs">
                {blog?.articles?.map((item)=> {

                    return(
                        <a className="blog" target="_blank" href={item.url}>
                        <img src={item.image} />
                        <div>
                            <h3 className="sourceName">
                                <span>{item.source.name}</span>
                                <span>{item.publishedAt}</span>
                            </h3>
                            <h1>{item.title}</h1>
                            <p>{item.description}</p>
                        </div>
                    </a>
                    );

                })}
                {blog.totalArticles ===0 && (
                    <h1 className="no__blogs">
                        No Blogs Available. Search something Else
                    </h1>
                )}
            </div>
            
        </div>
    )
}

export default Blog
