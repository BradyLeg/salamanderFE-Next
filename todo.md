## To Work On
# 1. Show a thumbnail preview
When a video is selected, fetch the first frame using GET /thumbnail/{filename}.

Display this frame side-by-side with a binarized version that updates live as settings change.

# 1. Allow live tuning
Users should be able to adjust a threshold slider and a color picker.

As these settings are changed, the binarized image should update in real time.

A dot should be drawn at the centroid of the largest connected group.

You must reimplement the logic you wrote for tuning in Java (in Auberon’s course) exactly in JavaScript.

# 1. Submit a processing job
Add a button labeled “Process Video with These Settings.”

This submits the job to the backend, where the salamander detection is handled.

Once complete, a CSV will be available at a static URL provided by the API.

When clicked, it should send a request to: POST /process/{filename}?targetColor=<hex>&threshold=<int>

# 1. Track job status
Show job progress and display a link to the resulting CSV file once it's done.

Use the returned jobId to track the status: GET /process/{jobId}/status

# Mock data is placeholder data you define locally to simulate real API responses. You can mock:

Video lists

Thumbnail previews

Job statuses

Final CSV URLs
