# With Docker

[deployment documentation](https://nextjs.org/docs/deployment#docker-image).

### Next.js API route support: https://nextjs.org/docs/api-routes/introduction

## Using Docker

1. [Install Docker](https://docs.docker.com/get-docker/) on your machine.
2. Build your container: `docker build -t community-db .`.
3. Run your container: `docker run -p 3000:3000 community-db`.

You can view your images created with `docker images`.

## Deploying to Google Cloud Run

1. Install the [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) so you can use `gcloud` on the command line.
2. Run `gcloud auth login` to log in to your account.
3. [Create a new project](https://cloud.google.com/run/docs/quickstarts/build-and-deploy) in Google Cloud Run (e.g. `nextjs-docker`). Ensure billing is turned on.
4. Build your container image using Cloud Build: `gcloud builds submit --tag gcr.io/PROJECT-ID/helloworld --project PROJECT-ID`. This will also enable Cloud Build for your project.
5. Deploy to Cloud Run: `gcloud run deploy --image gcr.io/PROJECT-ID/helloworld --project PROJECT-ID --platform managed`. Choose a region of your choice.

   - You will be prompted for the service name: press Enter to accept the default name, `community-db`.
   - You will be prompted for [region](https://cloud.google.com/run/docs/quickstarts/build-and-deploy#follow-cloud-run): select the region of your choice, for example `us-central1`.
   - You will be prompted to **allow unauthenticated invocations**: respond `y`.

Or click the button below, authorize the script, and select the project and region when prompted:

[![Run on Google Cloud](https://deploy.cloud.run/button.svg)](https://deploy.cloud.run/?git_repo=https://github.com/vercel/next.js.git&dir=examples/with-docker)

## Running Locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
