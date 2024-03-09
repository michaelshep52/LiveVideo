document.addEventListener('DOMContentLoaded', () => {
    const videoView = document.getElementById('video-view');
    const switchCameraButton = document.getElementById('switch-camera');
    let mediaRecorder;
    let currentCamera = 0;

    // Function to start the camera
    function startCamera() {
        navigator.mediaDevices.enumerateDevices()
            .then(devices => {
                const videoDevices = devices.filter(device => device.kind === 'videoinput');
                // Determines if devices has multiple camera's
                if (videoDevices.length > 1) {
                    // Show switch camera button
                    switchCameraButton.style.display = 'block'; 
                    switchCameraButton.addEventListener('click', switchCamera);
                } else {
                    // Hide switch camera button
                    switchCameraButton.style.display = 'none'; 
                }

                return navigator.mediaDevices.getUserMedia({ video: { deviceId: videoDevices[currentCamera].deviceId } });
            })
            .then((stream) => {
                videoView.srcObject = stream;
                startRecording(stream);
            })
            .catch(error => console.error('Error accessing camera:', error));
    }

    // Function to switch between cameras
    function switchCamera() {
        currentCamera = 1 - currentCamera; // Toggle between 0 and 1
        restartCamera();
    }

    // Function to restart the camera
    function restartCamera() {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
        }

        navigator.mediaDevices.getUserMedia({
            video: { deviceId: { exact: videoDevices[currentCamera].deviceId } }
        })
            .then((stream) => {
                videoView.srcObject = stream;
                startRecording(stream);
            })
            .catch(error => console.error('Error accessing camera:', error));
    }

    // Initial camera startup
    startCamera();
});
