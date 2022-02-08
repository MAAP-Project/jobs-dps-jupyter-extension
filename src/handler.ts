import { PageConfig, URLExt } from '@jupyterlab/coreutils';
import { ServerConnection } from '@jupyterlab/services';

/**
 * Call the API extension
 *
 * @param endPoint API REST end point for the extension
 * @param init Initial values for the request
 * @returns The response body interpreted as JSON
 */
export async function requestAPI<T>(
  endPoint = '',
  init: RequestInit = {}
): Promise<T> {
  // Make request to Jupyter API
  const settings = ServerConnection.makeSettings();
  const requestUrl = URLExt.join(
    settings.baseUrl,
    'jobs', // API Namespace
    endPoint
  );

  let response: Response;
  try {
    response = await ServerConnection.makeRequest(requestUrl, init, settings);
  } catch (error) {
    throw new ServerConnection.NetworkError(error);
  }

  let data: any = await response.text();

  if (data.length > 0) {
    try {
      data = JSON.parse(data);
    } catch (error) {
      console.log('Not a JSON response body.', response);
    }
  }

  if (!response.ok) {
    throw new ServerConnection.ResponseError(response, data.message || data);
  }

  return data;
}

export async function getJobs() {
  console.log("mlucas: in async jobs function")
  var requestUrl = new URL(PageConfig.getBaseUrl() + 'jobs/listJobs');
  console.log(requestUrl.href)
  
  requestUrl.searchParams.append("username", "anonymous");
  requestUrl.searchParams.append("proxy-ticket", "");

  //create a promise, this should then be directed to the handler.
  let response : any = await fetch(requestUrl.href, {
    headers: {
      'Content-Type': 'application/json'
    }
  })


  if (!response.ok) {
    console.log("something went wrong with request!!!")
  }else{
    //let res = response.json()
    console.log("request went well")
    //console.log(response.json())
  }

  return response.json();
}

export async function getAlgorithms() {
  console.log("Getting algorithms")
  var requestUrl = new URL(PageConfig.getBaseUrl() + 'jobs/listAlgorithms');
  console.log(requestUrl.href)

  //requestUrl.searchParams.append("username", "anonymous");
  //requestUrl.searchParams.append("proxy-ticket", "");
  requestUrl.searchParams.append("visibility", "all");

  let response : any = await fetch(requestUrl.href, {
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    console.log("something went wrong with request!!!")
  }else{
    //let res = response.json()
    console.log("request went well")
    //console.log(response.json())
  }

  return response.json();
}

export async function describeAlgorithms(algo_id:string) {
  var requestUrl = new URL(PageConfig.getBaseUrl() + 'jobs/describeAlgorithms');

  //requestUrl.searchParams.append("username", "anonymous");
  //requestUrl.searchParams.append("proxy-ticket", "");
  requestUrl.searchParams.append("algo_id", algo_id);

  let response : any = await fetch(requestUrl.href, {
    headers: {
      'Content-Type': 'application/json'
    }
  })

  let body = ""
  if (!response.ok) {
    console.log("something went wrong with request!!!")
  }else{
    body = response.json()
  }

  return body;
}

export async function getJobStatus(job_id:string) {
  var requestUrl = new URL(PageConfig.getBaseUrl() + 'jobs/getJobStatus');
  requestUrl.searchParams.append("job_id", job_id);
  let response : any = await fetch(requestUrl.href, {
    headers: {
      'Content-Type': 'application/json'
    }
  })

  let body = ""
  if (!response.ok) {
    console.log("something went wrong with request!!!")
  }else{
    console.log("Query submitted for: ", job_id)
    body = response.json()
  }

  return body;

}


export async function getCMRCollections() {
    var requestUrl = new URL(PageConfig.getBaseUrl() + 'jobs/getCMRCollections');
    let response : any = await fetch(requestUrl.href, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    //let body = ""
    if (!response.ok) {
      console.log("something went wrong with request!!!")
    }else{
      console.log("In collections frontend:")
      //body = response.json()
      //console.log(response.json())
    }

    return response.json();

}
