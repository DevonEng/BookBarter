# Backend for Software Engineering - Fall 2023 project

## How to Run

### Build Docker Image

```bash
docker build -t backend .
```

### Run Docker Image

```bash
docker run -itd --rm -p 3000:3000 backend   # outputs a container-id
```

### Test it out

```bash
curl -i localhost:3000
```

### Stop Docker Image

```bash
docker stop <container-id>
```

## Contribute

1. Fork this repository
1. Clone the forked repository onto your computer
1. Run ```npm install```
1. Make your changes and write appropriate tests
    1. Name your test files ```<filename>.test.js``` (check [index.test.js](./index.test.js) for template)
    1. To run a specific test file, use ```node --test <filename>.test.js```
    1. Validate all tests using ```node --test```
1. Use docker to run the project locally
1. After satisfaction, commit and push your changes
1. Submit a pull request (PR)
1. Follow the comments on your PR
