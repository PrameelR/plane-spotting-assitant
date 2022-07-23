import React, { Component } from 'react';
import { RiCheckboxBlankCircleFill } from 'react-icons/ri';



export class BreadCrumb extends Component {

    render() {
        return (
            <div className="breadcrumb-items-list d-flex flex-row align-items-cemter">
                {this.props.items.map(item=>{
                    return (
                        <div key={item.key} className="breadcrumb-list-item  d-flex flex-row align-items-cemter" onClick={e=>this.props.navigate(item.url)}>
                            <div className="breadcrumb-list-icon d-flex align-items-center">
                                {item.icon}
                            </div>
                            <div className="breadcrumb-list-text ps-2 d-flex align-items-center">
                                {item.title}
                            </div>
                            <div className="breadcrumb-list-item-end ps-3 pe-3 d-flex align-items-center">
                                <RiCheckboxBlankCircleFill/>
                            </div>
                        </div>
                        );
                })}

            </div>
        );

    }
}

export default BreadCrumb;