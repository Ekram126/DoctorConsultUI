
export const environment = {
  production: false,
  Domain: 'http://localhost:40378/',
  CreateContactUs: 'http://localhost:40378/api/ContactUs/CreateContactUs',

  Login: "http://localhost:40378/api/Authenticate/Login",
  Register: "http://localhost:40378/api/Authenticate/Register",
  DeleteUser: "http://localhost:40378/api/Authenticate/DeleteUser/",
  listOfRegisteredDoctors: "http://localhost:40378/api/Authenticate/ListOfRegisteredDoctors",
  listOfRegisteredSupervisorDoctors: "http://localhost:40378/api/Authenticate/ListOfRegisteredSupervisorDoctors",
  listOfRegisteredDoctorsBySpecialityId: "http://localhost:40378/api/Authenticate/ListOfRegisteredDoctorsBySpecialityId/",
  listOfRegisteredSupervisorDoctorsBySpecialityId: "http://localhost:40378/api/Authenticate/ListOfRegisteredSupervisorDoctorsBySpecialityId/",



  listSpecialists: 'http://localhost:40378/api/Specialist/ListSpecialists',
  ListSpecialistsByPages: 'http://localhost:40378/api/Specialist/ListSpecialistsByPages/',
  addSpecialist: 'http://localhost:40378/api/Specialist/AddSpecialist',
  editSpecialist: 'http://localhost:40378/api/Specialist/UpdateSpecialist',
  deleteSpecialist: 'http://localhost:40378/api/Specialist/DeleteSpecialist/',
  getSpecialistById: 'http://localhost:40378/api/Specialist/GetById/',
  generateSpecialityNumber: 'http://localhost:40378/api/Specialist/generateSpecialityNumber',
  autoCompleteSpecialityName: 'http://localhost:40378/api/Specialist/AutoCompleteSpecialityName/',



  listAllArticles: 'http://localhost:40378/api/Article/ListAllArticles',
  listArticles: 'http://localhost:40378/api/Article/ListArticles/',
  listActivatedArticles: 'http://localhost:40378/api/Article/GetActivatedArticles/',
  addArticle: 'http://localhost:40378/api/Article/AddArticle',
  editArticle: 'http://localhost:40378/api/Article/UpdateArticle',
  deleteArticle: 'http://localhost:40378/api/Article/DeleteArticle/',
  getArticleById: 'http://localhost:40378/api/Article/GetById/',
  updateArticleImageAfterInsert: "http://localhost:40378/api/Article/UpdateArticleImageAfterInsert",
  GetActivatedArticlesBySpecialityId: "http://localhost:40378/api/Article/GetActivatedArticlesBySpecialityId/",



  
  listAllVideos: 'http://localhost:40378/api/Video/ListAllVideos',
  listVideos: 'http://localhost:40378/api/Video/ListVideos/',
  listActivatedVideos: 'http://localhost:40378/api/Video/GetActivatedVideos/',
  addVideo: 'http://localhost:40378/api/Video/AddVideo',
  editVideo: 'http://localhost:40378/api/Video/UpdateVideo',
  deleteVideo: 'http://localhost:40378/api/Video/DeleteVideo/',
  getVideoById: 'http://localhost:40378/api/Video/GetById/',
  updateVideoImageAfterInsert: "http://localhost:40378/api/Video/UpdateVideoImageAfterInsert",
  GetActivatedVideosBySpecialityId: "http://localhost:40378/api/Video/GetActivatedVideosBySpecialityId/",






  listDoctors: 'http://localhost:40378/api/Doctor/ListDoctors/',
  listAllDoctors: 'http://localhost:40378/api/Doctor/ListAllDoctors',
  addDoctor: 'http://localhost:40378/api/Doctor/AddDoctor',
  editDoctor: 'http://localhost:40378/api/Doctor/UpdateDoctor',
  deleteDoctor: '',
  getDoctorById: 'http://localhost:40378/api/Doctor/GetById/',
  checkDoctorRole: 'http://localhost:40378/api/Doctor/CheckDoctorRole',
  GetDoctorsBySpecialityId: 'http://localhost:40378/api/Doctor/GetDoctorsBySpecialityId/',
  updateDoctorImageAfterInsert: "http://localhost:40378/api/Doctor/UpdateDoctorImageAfterInsert",

  listBanners: 'http://localhost:40378/api/Banner/ListBanners/',
  listAllBanners: 'http://localhost:40378/api/Banner/ListAllBanners',
  addBanner: 'http://localhost:40378/api/Banner/AddBanner',
  editBanner: 'http://localhost:40378/api/Banner/UpdateBanner',
  deleteBanner: '',
  getBannerById: 'http://localhost:40378/api/Banner/GetById/',
  checkBannerRole: 'http://localhost:40378/api/Banner/CheckBannerRole',
  GetBannersBySpecialityId: 'http://localhost:40378/api/Banner/GetBannersBySpecialityId/',
  updateBannerImageAfterInsert: "http://localhost:40378/api/Banner/UpdateBannerImageAfterInsert",




  listPatients: 'http://localhost:40378/api/Patient/ListPatients/',
   listAllPatients: 'http://localhost:40378/api/Patient/ListAllPatients/',
  addPatient: 'http://localhost:40378/api/Patient/AddPatient',
  editPatient: 'http://localhost:40378/api/Patient/UpdatePatient',
  deletePatient: 'http://localhost:40378/api/Patient/DeletePatient/',
  getPatientById: 'http://localhost:40378/api/Patient/GetById/',
  generatePatientNumber: 'http://localhost:40378/api/Patient/GeneratePatientNumber',


  listRequests: 'http://localhost:40378/api/Request/ListRequests/',
  addRequest: 'http://localhost:40378/api/Request/AddRequest',
  editRequest: '',
  deleteRequest: '',
  getRequestById: 'http://localhost:40378/api/Request/GetRequestById/',  
  generateRequestNumber: 'http://localhost:40378/api/Request/GenerateRequestNumber',
  addRequestTracking: 'http://localhost:40378/api/RequestTracking/AddRequestTracking',
  createRequestDocuments: 'http://localhost:40378/api/RequestDocument/CreateRequestDocuments',
  downloadRequestFiles: 'http://localhost:40378/api/RequestDocument/DownloadRequestFiles/',
  getAllTrackingsByRequestId: 'http://localhost:40378/api/RequestTracking/GetAllTrackingsByRequestId/',

  sendMailToPatient: 'http://localhost:40378/api/RequestTracking/sendMailToPatient',

  getRequestStatusByUserId: 'http://localhost:40378/api/RequestStatus/GetRequestStatusByUserId/',
  getRequestStatusByUserIdAndSpecialityId: 'http://localhost:40378/api/RequestStatus/GetRequestStatusByUserIdAndSpecialityId/',





  listAllCountries: 'http://localhost:40378/api/Country/ListAllCountries',
  GetPhoneCodeByCountryId: 'http://localhost:40378/api/Country/GetPhoneCodeByCountryId/',


  getPersonalData: 'http://localhost:40378/api/PersonalData/GetPersonalData',



  listSections: 'http://localhost:40378/api/Section/ListSections',
  selectSectionsInAbout: 'http://localhost:40378/api/Section/SelectSectionsInAbout', 
  addSection: 'http://localhost:40378/api/Section/AddSection',
  editSection: 'http://localhost:40378/api/Section/UpdateSection',
  deleteSection: 'http://localhost:40378/api/Section/DeleteSection/',
  getSectionById: 'http://localhost:40378/api/Section/GetById/',
  updateSectionImageAfterInsert: "http://localhost:40378/api/Section/UpdateSectionImageAfterInsert",

};
