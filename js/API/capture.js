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
         navigator.notification.alert('1', null, 'mns');
        navigator.device.capture.captureImage(capture.captureSuccess, capture.captureError, {limit:2});
         navigator.notification.alert('2', null, 'mns');

    }
}