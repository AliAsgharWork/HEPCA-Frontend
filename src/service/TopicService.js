import axios from "axios";

const TOPIC_API_BASE_URL = "http://127.0.0.1:8000/topics/";

class TopicService {
  getTopics() {
    return axios.get(TOPIC_API_BASE_URL);
  }

  createTopics(topic) {
    return axios.post(TOPIC_API_BASE_URL, topic);
  }

  getTopicById(topicId) {
    return axios.get(TOPIC_API_BASE_URL + "/" + topicId);
  }

  updateTopic(topic, topicId) {
    return axios.put(TOPIC_API_BASE_URL + "/" + topicId, topic);
  }

  deleteTopic(topicId) {
    return axios.delete(TOPIC_API_BASE_URL + "/" + topicId);
  }
}

export default new TopicService();
