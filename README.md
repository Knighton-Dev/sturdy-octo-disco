# Azure Pipelines PagerDuty Send Change Event

An Azure Pipelines Task for sending a Change Event message to the [PagerDuty Change Events API](https://developer.pagerduty.com/api-reference/b3A6Mjc0ODEyMQ-create-a-change-event). 

![Change Details Screenshot](https://raw.githubusercontent.com/Knighton-Dev/sturdy-octo-disco/main/images/change-details.png)

## Introduction

We were in need of a way to send Change Events from our release pipelines to our PagerDuty services. There wasn't a straight forward way to do this through any existing extensions, so we slammed this together. 

## Arguments

![Example Pipeline Screenshot](https://raw.githubusercontent.com/Knighton-Dev/sturdy-octo-disco/main/images/pipeline-example.png)

*Arguments in **bold** are required.*

| Argument | Description | Example |
| -- | -- | -- |
| **Routing Key** | The GUID of one of your Events API V2 integrations. This is the "Integration Key" listed on the Events API V2 integration's detail page. You can generate this by going to `Services` > Find the "Recent Changes" section > Click `Add a Change Integration` > Click `Add a Change Integration` (*again*) > Select the radio button for `PagerDuty Events API` > Set an `Integration Name` > Select the appropriate Service from the drop down, | `ehs8675309` |
| **Summary** | A brief text summary of the event, used to generate the summaries/titles of any associated alerts. This can be the existing `Release.ReleaseName` from the release pipeline. | `Added a checkbox for extra hotsauce to the form` |
| Source | The unique location of the affected system, preferably a hostname or FQDN. You can also use the specific pipeline or repo that initiated the release. | `https://github.com/Knighton-Dev/sturdy-octo-disco.git` |
| Build State | The state of the build. This can be the existing `Agent.JobStatus` or any other states you want to add. | `Succeeded` |
| Build Number | The number of the build. This can be the `Build.BuildNumber` from the pipeline. | `20220126.1` | 
| **Link** | The link being attached to an incident or alert. This will be added to the `Recent Changes` section. It can be used to link directly to the release pipeline. You can use the `Release.ReleaseWebURL` variable provided by Microsoft. | `https://dev.azure.com/{YOUR_ORG}/{YOUR_PROJECT}/_release?definitionId=1&view=mine&_a=releases`|
| Link Text | Optional information pertaining to this context link. It will override the `Link` and display a "*friendly*" name for the link. The `Release.ReleaseName` works pretty well here. | `Release Pipeline` |

## Reporting Failed Releases

![Control Options Screenshot](https://raw.githubusercontent.com/Knighton-Dev/sturdy-octo-disco/main/images/control-options.png)

If you would like to report when a release has failed or canceled, you will need to enable change the `Run this task` option under `Control Options` to `Even if a previous task has failed, even if the deployment was canceled`.
