import React, { Component } from "react";
import MainContainer from "../layout/MainContainer";
import SearchContainer from "../layout/SearchContainer";
import RoleSearch from "../../components/role/search";
import RoleTable from "../../components/role/table";

export default class list extends Component {
  state = {
    search_params: {}
  };

  changeSearchParam = (param, search_flag) => {
    this.setState(
      {
        search_params: param == null ? {} : param
      },
      () => {
        // console.log("params at body:{}" + JSON.stringify(this.state.search_params))
        this.param_change_search(search_flag);
      }
    );
  };

  onRef = ref => {
    this.table = ref;
  };

  param_change_search = search_flag => {
    this.table.param_change_search(this.state.search_params, search_flag);
  };

  render() {
    return (
      <MainContainer>
        <div className="retract-x">
          <SearchContainer>
            <RoleSearch changeParam={this.changeSearchParam} />
          </SearchContainer>
          <RoleTable class="search-table-gap" onRef={this.onRef} />>
        </div>
      </MainContainer>
    );
  }
}
