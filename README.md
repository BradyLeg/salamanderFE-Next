# 🦎 Salamander Finder

A tool for tracking object centroids from videos using a Docker-based processing engine and a React front-end.

---

## 📦 Prerequisites

### 1. Download the Docker Image

Download (or pull) the Salamander Processor Docker image from: "URL"

### 2. Prepare Input & Output Folders

Create two folders anywhere on your machine:

- `input` — contains videos or images you want processed  
- `output` — where CSV tracking results will be saved

Example folder structure:
```bash
salamander/
├── input/
└── output/
```

### 3. Run the Docker Processor

Run the processor container with folder mounts.

#### **Linux / macOS Example**
```bash
docker run -p 3000:3000 \
  -v ~/salamander/input:/videos \
  -v ~/salamander/output:/results \
  ghcr.io/dani-dev28/salamander:latest
```
#### **Windows PowerShell Example**

```bash
docker run -p 3000:3000 `
  -v "C:\salamander\input:/videos" `
  -v "C:\salamander\output:/results" `
  ghcr.io/dani-dev28/salamander:latest
```

## 💻 Front-End Setup

### Important Notes

Place any images or videos you want processed inside the input folder.
Processed CSV results will appear inside the output folder.
Ensure Docker is running on `http://localhost:3000`

### 1. Fork & Clone the Repository

[https://github.com/BradyLeg/salamanderFE-Next.git](https://github.com/BradyLeg/salamanderFE-Next.git)

### 2. Install Dependancy
Run "npm i" in terminal to install all packages.

```bash
npm i
```

### 3. Run Program

Run "npm run dev" in terminal to start up project.

```bash
npm run dev
```

## 🧭 Using Salamander Finder

### 1. Open webpage

Open project webpage at [http://localhost:3001](http://localhost:3001) or the next availible port.

### 2. Select Video

Choose a video from the dropdown (videos come from the `/videos` mount).

### 3. Adjust Detection Settings

- Pick the target color
- Tune threshold values
- Use the binarized preview to ensure the marker appears clearly on the target object

### 6. Process the Video

Click: “Process Video with These Settings” --- to start processing the video and wait for the processor to finish.

### 7. Download CSV

Once the processor is done, click the "download" button to download the csv.

## 📁 Viewing Previous Jobs

If you want to download the CSV for a previous Job, click on the `Results` link to find them listed out. 
