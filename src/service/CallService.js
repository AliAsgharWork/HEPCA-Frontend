import axios from "axios";

const CALL_API_BASE_URL = "http://127.0.0.1:8000/calls/";

class CallService {
  getCalls() {
    return axios.get(CALL_API_BASE_URL);
  }

  createCalls(call) {
    return axios.post(CALL_API_BASE_URL, call);
  }

  getCallById(callId) {
    return axios.get(CALL_API_BASE_URL + "/" + callId);
  }

  updateCall(call, callId) {
    return axios.put(CALL_API_BASE_URL + "/" + callId, call);
  }

  deleteCall(callId) {
    return axios.delete(CALL_API_BASE_URL + "/" + callId);
  }
}

export default new CallService();
