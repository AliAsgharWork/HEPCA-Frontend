import axios from "axios";

const CALL_API_BASE_URL = "http://127.0.0.1:8000/BERTcheck/";

class CallService {
  //Value formatting
  static v_f(tag, n) {
    console.log(n);
    if (n == "") {
      return "";
    } else {
      return tag + "=[" + n + "]";
    }
  }
  static date_f(tag, n) {
    console.log(n);
    if (n == "") {
      return "";
    } else {
      return tag + "=" + n;
    }
  }

  getCalls(
    text,
    trl_value,
    budget_value,
    overallbudget_value,
    nop_value,
    deadline_value,
    startdate_value
  ) {
    console.log(budget_value);
    return axios.get(
      CALL_API_BASE_URL +
        "?q=" +
        text +
        CallService.v_f("&budget", budget_value) +
        CallService.v_f("&overall_budget", overallbudget_value) +
        CallService.v_f("&nop", nop_value) +
        CallService.v_f("&trl", trl_value)
      // CallService.date_f("&deadline", deadline_value) +
      // CallService.date_f("&startdate", startdate_value)
    );
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
