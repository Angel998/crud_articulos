<?php
class Articles extends Controller
{

    public function __construct()
    {
        $this->initController(CTR_PRIVATE);
        $this->articleModel = $this->model('Article');
    }

    public function get()
    {
        $this->useGetRequest();
        $articles = $this->articleModel->get_articles();
        $this->response($articles);
    }

    public function get_one($id)
    {
        $this->useGetRequest();
        $article = $this->articleModel->get_article($id);
        if (is_null($article)) {
            $this->response(null, ERROR_NOTFOUND);
        }
        $this->response($article);
    }

    public function search($field)
    {
        $this->useGetRequest();
        $articles = $this->articleModel->search($field);
        $this->response($articles);
    }

    public function add()
    {
        $this->usePostRequest();
    }

    public function update($id)
    {
        $this->usePutRequest();
    }

    public function delete($id)
    {
        $this->useDeleteRequest();
    }
}
