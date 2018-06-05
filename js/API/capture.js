var capture = {
    captureSuccess: function(mediaFiles){
                            var i, path, len;
                            for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                                path = mediaFiles[i].fullPath;
                                // do something interesting with the file
                            }
        //$('#regFoto').attr('data-foto',path);
        //$('#regFoto').html('<img src="'+path+'" style="width:100%;">');
    },
    captureError: function(error) {
        navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    },
    takePhoto: function(){
         navigator.notification.alert('takePhoto: ', null, 'Capture Error');
        navigator.device.capture.captureImage(captureSuccess, captureError, {limit:2});
    }
}