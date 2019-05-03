import React, {Component} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Row from "./Row";
import {Table} from "reactstrap";
import API from "../../utils/AppUtil";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentOffset: 0,
            usersListData: [],
            propertyCount:0,
            limit: 20,
            page:1,
            hasMoreItems: true,
            isRunning: false,
            loading_state:true
        }
    }

    async componentWillMount() {
        let staticArray = [];
        let offset = this.state.currentOffset + this.state.limit;
        await this.setState({
            usersListData: staticArray,
            currentOffset: offset,
            isRunning: false,
            propertyCount:staticArray.count,
            hasMoreItems: true,
            loading_state:false
        });
        await this.loadProperties();
    }

     loadProperties = async () => {
        if (this.state.hasMoreItems && !this.state.isRunning) {
            this.setState({ isRunning: true });
            await API.getUsers(this.state.page,this.state.limit)
                .then((response) => {
                    let staticArray = [];
                    let userList = response.results;
                    for (let i = 0; i <= response.info.results-1; i++) {
                        staticArray.push(userList[i]);
                    }
                    let offset = this.state.currentOffset + this.state.limit;
                    let hasMoreItemsCheck= true;
                    let records = [...this.state.usersListData, ...staticArray];
                    if(records.length >= 500){
                        hasMoreItemsCheck = false;
                    }
                    this.setState({
                        usersListData: records,
                        currentOffset: offset,
                        isRunning: false,
                        propertyCount:staticArray.count + this.state.limit,
                        hasMoreItems: hasMoreItemsCheck,
                        loading_state:false,
                        page:this.state.page+1
                    })
                })
                .catch((err) => {
                    this.setState({ isRunning: false });
                });
        }
    }

    render() {
        const {usersListData} = this.state;
        let items = [];
        usersListData.map((user, key) => {
            const row = <Row key={key} data={user} />;
            items.push(row);
        });
        return (
            <div className="App">
                <InfiniteScroll
                    pageStart={this.state.currentOffset}
                    loadMore={this.loadProperties.bind(this)}
                    hasMore={this.state.hasMoreItems}
                    threshold={600}
                    initialLoad={false}
                    loader={<div className="loading" key={0}> Loading... </div>}
                >
                    <div className="container mt-5">
                        <Table bordered>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Full - Name</th>
                                    <th>E-Mail</th>
                                    <th>Date of Birth</th>
                                    <th>phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items}
                            </tbody>
                        </Table>
                    </div>
                </InfiniteScroll>
            </div>
        );
    }
}

export default App;
