import React, {Component} from "react";
import {getUsers} from "../../store/actions/users";
import {connect} from 'react-redux';
import {Table} from 'reactstrap';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import Loading from "../../components/Loading";

class UsersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [],
            info: {},
            loading:true
        }
    }

    async componentDidMount() {
        await this.onClickPage(1);
    }

    onClickPage = async (page) => {
        await this.setState({loading:true});
        await this.props.getUsers(page);
        await this.setState({userData: this.props.users.users.data.results, info: this.props.users.users.data.info, loading:false});
    }

    render() {
        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>{`Image`}</th>
                            <th>{`Full Name`}</th>
                            <th>{`E-Mail`}</th>
                            <th>{`DOB`}</th>
                            <th>{`Phone`}</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        !this.state.loading && this.state.userData.length && this.state.userData.map((data, key) => {
                            return (
                                <tr key={"table"+key}>
                                    <td><img src={data.picture.thumbnail} title={data.name.title}/></td>
                                    <td>{data.name ? data.name.title + " " + data.name.first + " " + data.name.last : null}</td>
                                    <td>{data.email ? data.email : null}</td>
                                    <td>{data.dob.date ? new Date(data.dob.date).getFullYear() + '-' + (new Date(data.dob.date).getMonth() + 1) + '-' + new Date(data.dob.date).getDate() : null}</td>
                                    <td>{data.phone ? data.phone : null}</td>
                                </tr>
                            )
                        })
                    }
                    {this.state.loading === true && <div className="float-left">
                        <Loading />
                    </div>}
                    </tbody>
                </Table>
                <div>
                    {
                        this.state.info.page > 0 &&
                        <Pagination aria-label="Page navigation example">
                            <PaginationItem>
                                <PaginationLink first onClick={() => this.onClickPage(1)}/>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink previous onClick={() => this.onClickPage(this.state.info.page - 1)}/>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink onClick={() => this.onClickPage(this.state.info.page + 2)}>
                                    {this.state.info.page + 2}
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink onClick={() => this.onClickPage(this.state.info.page + 3)}>
                                    {this.state.info.page + 3}
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink onClick={() => this.onClickPage(this.state.info.page + 4)}>
                                    {this.state.info.page + 4}
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink onClick={() => this.onClickPage(this.state.info.page + 5)}>
                                    {this.state.info.page + 5}
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink next onClick={() => this.onClickPage(this.state.info.page + 1)}/>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink last onClick={() => this.onClickPage(this.state.info.page)}/>
                            </PaginationItem>
                        </Pagination>
                    }
                </div>
            </div>
        );
    }
}

const state = store => (
    {
        users: store.users
    });
export default connect(state, {getUsers})(UsersPage);


