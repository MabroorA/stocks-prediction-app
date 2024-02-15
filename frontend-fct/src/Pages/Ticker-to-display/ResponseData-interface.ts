interface Value {
    timestamp: number;
    value: number;
  }
  
  interface Results {
    underlying: {
      url: string;
    };
    values: Value[];
  }
  
  interface ResponseData {
    results: Results;
    status: string;
    request_id: string;
    next_url: string;
  }
  
  export default ResponseData;