import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import IndoPacific from './Indo-Pacific.png';
import InfiniteScroll from "react-infinite-scroll-component";
import noImagePreview from './noImagePreview.jpg';

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
            totalResults: 0,
        }
    }

    async update_news() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;

        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        });
        document.title = "IndoZone - " + this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1);
    };

    async componentDidMount() {
        this.update_news();
        console.log("cdm");
    }

    fetchMoreData = async () => {
        const nextPage = this.state.page + 1;
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${nextPage}&pagesize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            page: this.state.page + 1, // Corrected increment
        });
        document.title =
            'IndoZone - ' + this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1);
        console.log(this.state?.articles?.length);
        console.log(this.state?.totalResults);
    };



    render() {
        return (
            <>
                <div className="d-flex container " style={{marginTop:"60px"}}>
                    <img className='mt-4' src={IndoPacific} alt='...' style={{ height: '60px', /* width: '65px', */ marginRight: '20px' }} />
                    <h1 className='mt-4 text-danger-emphasis'>IndoZone -  Top {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}  Headlines</h1>
                </div>
                <div className='text-end mb-4 container' > {new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}</div>

                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container my-3">
                        <div className="row">
                            {/* // ! WHEN NOT LOADING THEN ONLY DISPLAY CONTENT */}
                            {this.state.articles.map((elem) => {
                                return <div key={elem.title} className="col-md-4 mb-5">
                                    <NewsItem
                                        title={elem.title === null ? "" : elem.title.slice(0, 32)}
                                        description={elem.description === null ? "" : elem.description.slice(0, 80)}
                                        imageUrl={elem.urlToImage ? elem.urlToImage : noImagePreview}
                                        newsUrl={elem.url} author={elem.author === null ? "Unknown" : elem.author}
                                        timeStamp={elem.publishedAt} source={elem.source.name}
                                    />
                                </div>
                            })}
                        </div>
                    </div >
                </InfiniteScroll>


            </>
        )
    }
}
