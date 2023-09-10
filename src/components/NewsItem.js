import React, { Component } from 'react'
import { Link } from 'react-router-dom';
export default class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, timeStamp, author, source } = this.props;
        return (
            <div>
                <div className=" shadow card" style={{ width: "24rem", height: "423px" }}>
                    <span className="fw-medium fs-6 badge text-bg" style={{ backgroundColor: '#f5058d', height: "28px", position: "absolute", right: 0 }}>{source}</span>
                    <img src={imageUrl} style={{ height: "200px" }} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title ">{title}{title.length >= 32 ? "..." : ""} </h5>
                        <p className="card-text ">{description}{description.length >= 80 ? "..." : ""}</p>

                        <p className="card-text">
                            <small className="text-danger-emphasis">Author : {author.length < 30 ? author : author.slice(30) + "..."}</small> <br />
                            <small className="text-primary-emphasis">Published at : {new Date(timeStamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</small>
                        </p>
                        <Link target="_blank" to={newsUrl} className="btn btn-outline-dark btn-sm fw-semibold">Read More</Link>
                    </div>
                </div>

            </div>
        )
    }
}
