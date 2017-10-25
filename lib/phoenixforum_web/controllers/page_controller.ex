defmodule PhoenixforumWeb.PageController do
  use PhoenixforumWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
