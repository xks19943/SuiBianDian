import {$http} from '../services';

const initState = {
  categoryList: []
};

export const GET_CUSTOM_MENU_SUCCESS = 'GET_CUSTOM_MENU_SUCCESS';

export const classify = (state = initState, action) => {

};

export const getCustomMenuSuccess = (categoryList)=>({
  type: GET_CUSTOM_MENU_SUCCESS,
  result: categoryList
});


export const getCategoryList = (args, options) => {
  return async (dispatch,getState) => {
    try {
      let categoryListResponse = await $http.get('/item/get-custom-menus',args, options);
      let data = categoryListResponse.data;
      let menuList = (data.menus && data.menus.menuSourceType2) || [];
      dispatch(getCustomMenuSuccess(menuList));
    } catch (e){

    }
  }
};