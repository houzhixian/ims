import React, {Component} from 'react';
import SearchContainer from "../layout/SearchContainer";
import MenuSearch from "../../components/menu/search";
import MenuTable from "../../components/menu/table";

export default class list extends Component {
    render() {
        return (
            <div>
                <SearchContainer>
                    <MenuSearch />
                </SearchContainer>

                <MenuTable>

                </MenuTable>
            </div>
        )
    }
}