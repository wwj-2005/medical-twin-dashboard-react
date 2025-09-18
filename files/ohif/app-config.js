window.config = {
  routerBasename: '/',
  showStudyList: true,
  servers: {
    dicomWeb: [
      {
        name: 'Orthanc',
        wadoUriRoot: 'http://orthanc:8042/wado',
        qidoRoot: 'http://orthanc:8042/dicom-web',
        wadoRoot: 'http://orthanc:8042/dicom-web',
        qidoSupportsIncludeField: true,
        requestOptions: {
          requestFromBrowser: true
        }
      }
    ]
  }
};