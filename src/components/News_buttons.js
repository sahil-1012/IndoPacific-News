import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import IndoPacific from './Indo-Pacific.png';

export default class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 12,
        category: "general"
    };
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    };

    constructor(props) {
        super(props);
        console.log("Hello Constructor here from NewsComponent");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: null,
        }
    }

    async update_news() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=20980da526544dd4baa2c13641a851c8&pagesize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url)
        let parsedData = await data.json(data);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        document.title = "NewsMonkey - " + this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1);
    }

    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=20980da526544dd4baa2c13641a851c8&pagesize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url)
        // let parsedData = await data.json(data);
        // this.setState({
        //     articles: parsedData.articles,
        //     totalResults: parsedData.totalResults,
        //     loading: false
        // })
        this.update_news();
    }

    //  ~ ***** ORDER OF EXECUTION
    // ==> CONSTRUCTOR ==> RENDER ==> CDM

    handleNextClick = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=20980da526544dd4baa2c13641a851c8&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url)
        // let parsedData = await data.json(data);
        // console.log(parsedData);
        // this.setState({
        //     articles: parsedData.articles,
        //     page: this.state.page + 1,
        //     loading: false
        // })
        this.setState({ page: this.state.page + 1 })
        this.update_news();
    }
    handlePrevClick = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=20980da526544dd4baa2c13641a851c8&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url)
        // let parsedData = await data.json(data);
        // console.log(parsedData);
        // this.setState({
        //     articles: parsedData.articles,
        //     page: this.state.page - 1,
        //     loading: false
        // })
        this.setState({ page: this.state.page + 1 })
        this.update_news();
    }

    render() {
        return (
            <>
                <div className="container my-3">
                    <div className="d-flex  ">
                        <img className='mt-4' src={IndoPacific} alt='...' style={{ height: '60px', width:'65px', marginRight :'20px' }} />
                        <h1 className='mt-4 text-danger-emphasis'>Indo-Pacific Region -  Top {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}  Headlines</h1>
                    </div>

                    <div className='text-end mb-4' > {new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}</div>
                    {this.state.loading && <Spinner />}

                    <div className="row">
                        {/* // ! WHEN NOT LOADING THEN ONLY DISPLAY CONTENT */}
                        {!this.state.loading && this.state.articles.filter(elem => elem.urlToImage !== null).map((elem) => {
                            return <div key={elem.url} className="col-md-4 mb-5">
                                <NewsItem title={elem.title === null ? "" : elem.title.slice(0, 32)} description={elem.description === null ? "" : elem.description.slice(0, 80)} imageUrl={elem.urlToImage} newsUrl={elem.url} author={elem.author === null ? "Unknown" : elem.author} timeStamp={elem.publishedAt} source={elem.source.name} />
                            </div>
                        })}
                    </div>
                    <div className="container d-flex justify-content-between ">
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-outline-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
                        <button disabled={(this.state.totalResults / this.props.pageSize) < this.state.page + 1} type="button" className="btn btn-outline-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div>

                </div>
            </>
        )
    }
}
