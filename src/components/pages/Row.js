import React from 'react';

class Row extends React.Component {
    render() {
        const user = this.props.data;
        return (
            <tr className="list-min-div estate-works-item">
                <td>
                    {user.picture.thumbnail?<img src={user.picture.thumbnail} title={user.name.title}></img>:user.name.title}
                </td>
                <td>{user.name.title ? user.name.title +" "+ user.name.first+" "+user.name.last : null }</td>
                <td>{user.email ? user.email: null}</td>
                <td>{user.dob.date ? new Date(user.dob.date).getFullYear() + '-' + (new Date(user.dob.date).getMonth() + 1) + '-' + new Date(user.dob.date).getDate() : null}</td>
                <td>{user.phone ? user.phone : null}</td>
            </tr>
        );
    }
}

export default Row;
