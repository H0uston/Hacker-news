import {compose} from "redux";
import {connect} from "react-redux";
import {
    getLastNewsItemsSelector,
    getLastNewsMaxCountSelector,
    getUpdateNewsTimeSelector
} from "../../../selectors/newsListPageSelectors";
import NewsListPage from "./NewsListPage";
import {getLastNews} from "../../../state/newsList/newsListReducer";

let mapStateToProps = (state) => ({
    newsItems: getLastNewsItemsSelector(state),
    lastNewsMaxCount: getLastNewsMaxCountSelector(state),
    updateNewsTime: getUpdateNewsTimeSelector(state),
});


export default compose(connect(mapStateToProps, {getLastNews}))(NewsListPage);