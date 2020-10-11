import ajax from './request';
export default class checkAjax {
    /**
     * 获取文章列表
     */
    public getArticlesList: Function = async (page?: number, pageSize?: number, tagsId?:number) => {
        const response = await ajax('api/articles/list', { page, pageSize, tagsId} ,'get');
        console.log(response);
    }
    /**
     * 获取文章详情
     */
    public getArticlesDetail: Function = async (id: number) => {
        const response = await ajax('api/articles/detail', { id }, 'get');
        console.log(response);
    }
}