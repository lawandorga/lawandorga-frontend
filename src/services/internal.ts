import {
  Article,
  ImprintPage,
  LoginPage,
  RoadmapItem,
  TomsPage,
} from "@/types/internal";
import axios from "axios";

class InternalService {
  getRoadmapItems(): Promise<RoadmapItem[]> {
    return axios
      .get<RoadmapItem[]>("roadmap-items/")
      .then((response) => response.data);
  }

  getArticles(): Promise<Article[]> {
    return axios.get<Article[]>("articles/").then((response) => response.data);
  }

  getArticle(id: number | string): Promise<Article> {
    return axios
      .get<Article>(`articles/${id}/`)
      .then((response) => response.data);
  }

  getLoginPage(): Promise<LoginPage> {
    return axios
      .get<LoginPage>("pages/index/")
      .then((response) => response.data);
  }

  getImprintPage(): Promise<ImprintPage> {
    return axios
      .get<ImprintPage>("pages/imprint/")
      .then((response) => response.data);
  }

  getTomsPage(): Promise<TomsPage> {
    return axios
      .get<ImprintPage>("pages/toms/")
      .then((response) => response.data);
  }
}

export default new InternalService();
