import {compose} from "redux";
import {connect} from "react-redux";
import NewsPage from "./NewsPage";
import {withRouter} from "react-router-dom";
import {getNewsInfoIsFetchingSelector, getNewsDataSelector} from "../../selectors/newsPageSelectors";
import {getNewsInfo} from "../../state/news/newsReducer";

let mapStateToProps = (state) => ({
    isFetching: getNewsInfoIsFetchingSelector(state),
    newsInfo: getNewsDataSelector(state),
});


export default compose(
    connect(mapStateToProps, {getNewsInfo}),
    withRouter
)(NewsPage);