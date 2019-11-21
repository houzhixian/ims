import React, {Component} from 'react';
import SearchContainer from "../layout/SearchContainer";
import MenuSearch from "../../components/menu/search";

export default class list extends Component {
    render() {
        return (
            <div>
                <SearchContainer>
                    <MenuSearch />
                </SearchContainer>
            </div>
        )
    }
}