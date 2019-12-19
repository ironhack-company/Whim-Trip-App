let baseURL; 
process.env.NODE_ENV === "production"
  ? (baseURL = "http://whim-travel.co")
  : (baseURL = "http://localhost:5000");


export default baseURL  
