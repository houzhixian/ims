import React, {Component} from 'react';
import SearchContainer from "../layout/SearchContainer";
import MenuSearch from "../../components/menu/search";
import MenuTable from "../../components/menu/table";

export default class list extends Component {

    state = {
        search_params: {}
    }

    changeSearchParam = (param, search_flag) => {
        this.setState({
            search_params : param == null ? {} : param
        }, () => {
            console.log("params at body:{}" + JSON.stringify(this.state.search_params))
            this.param_change_search(search_flag);
        })
        
    }

    onRef = (ref) => {
        this.table = ref;
    }

    param_change_search = (search_flag) => {
        this.table.param_change_search(this.state.search_params, search_flag);
    }


    render() {
        return (
            <div className="retract-x">
                <SearchContainer>
                    <MenuSearch changeParam = {this.changeSearchParam}/>
                </SearchContainer>

                <MenuTable class='search-table-gap' onRef={this.onRef}/>>

            </div>
        )
    }
}