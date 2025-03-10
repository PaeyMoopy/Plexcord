---
title: "Overseerr API Reference"
source: "https://api-docs.overseerr.dev/#/public/get_status"
author:
published:
created: 2025-03-05
description:
tags:
  - "clippings"
---
### [public](https://api-docs.overseerr.dev/#/public)

Public API endpoints requiring no authentication.

Returns the current Overseerr status in a JSON object.

| Code | Description | Links |
| --- | --- | --- |
| 200 | Returned status  Media type  Controls `Accept` header.  ```json {   "version": "1.0.0",   "commitTag": "string",   "updateAvailable": true,   "commitsBehind": 0,   "restartRequired": true } ``` | *No links* |

For Docker installs, returns whether or not the volume mount was configured properly. Always returns true for non-Docker installs.

| Code | Description | Links |
| --- | --- | --- |
| 200 | Application data volume status and path  Media type  Controls `Accept` header.  ```json {   "appData": true,   "appDataPath": "/app/config" } ``` | *No links* |

### [settings](https://api-docs.overseerr.dev/#/settings)

Endpoints related to Overseerr's settings and configuration.

Retrieves all main settings in a JSON object.

| Code | Description | Links |
| --- | --- | --- |
| 200 | OK  Media type  Controls `Accept` header.  ```json {   "apiKey": "string",   "appLanguage": "en",   "applicationTitle": "Overseerr",   "applicationUrl": "https://os.example.com",   "trustProxy": true,   "csrfProtection": false,   "hideAvailable": false,   "partialRequestsEnabled": false,   "localLogin": true,   "newPlexLogin": true,   "defaultPermissions": 32 } ``` | *No links* |

Updates main settings with the provided values.

```json
{
  "appLanguage": "en",
  "applicationTitle": "Overseerr",
  "applicationUrl": "https://os.example.com",
  "trustProxy": true,
  "csrfProtection": false,
  "hideAvailable": false,
  "partialRequestsEnabled": false,
  "localLogin": true,
  "newPlexLogin": true,
  "defaultPermissions": 32
}
```

| Code | Description | Links |
| --- | --- | --- |
| 200 | Values were sucessfully updated  Media type  Controls `Accept` header.  ```json {   "apiKey": "string",   "appLanguage": "en",   "applicationTitle": "Overseerr",   "applicationUrl": "https://os.example.com",   "trustProxy": true,   "csrfProtection": false,   "hideAvailable": false,   "partialRequestsEnabled": false,   "localLogin": true,   "newPlexLogin": true,   "defaultPermissions": 32 } ``` | *No links* |

Returns main settings in a JSON object, using the new API key.

| Code | Description | Links |
| --- | --- | --- |
| 200 | OK  Media type  Controls `Accept` header.  ```json {   "apiKey": "string",   "appLanguage": "en",   "applicationTitle": "Overseerr",   "applicationUrl": "https://os.example.com",   "trustProxy": true,   "csrfProtection": false,   "hideAvailable": false,   "partialRequestsEnabled": false,   "localLogin": true,   "newPlexLogin": true,   "defaultPermissions": 32 } ``` | *No links* |

Retrieves current Plex settings.

| Code | Description | Links |
| --- | --- | --- |
| 200 | OK  Media type  Controls `Accept` header.  ```json {   "name": "Main Server",   "machineId": "1234123412341234",   "ip": "127.0.0.1",   "port": 32400,   "useSsl": true,   "libraries": [     {       "id": "string",       "name": "Movies",       "enabled": false     }   ],   "webAppUrl": "https://app.plex.tv/desktop" } ``` | *No links* |

Updates Plex settings with the provided values.

```json
{
  "ip": "127.0.0.1",
  "port": 32400,
  "useSsl": true,
  "webAppUrl": "https://app.plex.tv/desktop"
}
```

| Code | Description | Links |
| --- | --- | --- |
| 200 | Values were successfully updated  Media type  Controls `Accept` header.  ```json {   "name": "Main Server",   "machineId": "1234123412341234",   "ip": "127.0.0.1",   "port": 32400,   "useSsl": true,   "libraries": [     {       "id": "string",       "name": "Movies",       "enabled": false     }   ],   "webAppUrl": "https://app.plex.tv/desktop" } ``` | *No links* |

Returns a list of Plex libraries in a JSON array.

| Name | Description |
| --- | --- |
| sync  string  (  query  ) | Syncs the current libraries with the current Plex server |
| enable  string  (  query  ) | Comma separated list of libraries to enable. Any libraries not passed will be disabled! |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Plex libraries returned  Media type  Controls `Accept` header.  ```json [   {     "id": "string",     "name": "Movies",     "enabled": false   } ] ``` | *No links* |

Returns scan progress in a JSON array.

| Code | Description | Links |
| --- | --- | --- |
| 200 | Status of Plex scan  Media type  Controls `Accept` header.  ```json {   "running": false,   "progress": 0,   "total": 100,   "currentLibrary": {     "id": "string",     "name": "Movies",     "enabled": false   },   "libraries": [     {       "id": "string",       "name": "Movies",       "enabled": false     }   ] } ``` | *No links* |

Runs a full Plex library scan and returns the progress in a JSON array.

```json
{
  "cancel": false,
  "start": false
}
```

| Code | Description | Links |
| --- | --- | --- |
| 200 | Status of Plex scan  Media type  Controls `Accept` header.  ```json {   "running": false,   "progress": 0,   "total": 100,   "currentLibrary": {     "id": "string",     "name": "Movies",     "enabled": false   },   "libraries": [     {       "id": "string",       "name": "Movies",       "enabled": false     }   ] } ``` | *No links* |

Returns a list of available Plex servers and their connectivity state

| Code | Description | Links |
| --- | --- | --- |
| 200 | OK  Media type  Controls `Accept` header.  ```json [   {     "name": "My Plex Server",     "product": "Plex Media Server",     "productVersion": "1.21",     "platform": "Linux",     "platformVersion": "default/linux/amd64/17.1/systemd",     "device": "PC",     "clientIdentifier": "85a943ce-a0cc-4d2a-a4ec-f74f06e40feb",     "createdAt": "2021-01-01T00:00:00.000Z",     "lastSeenAt": "2021-01-01T00:00:00.000Z",     "provides": [       "server"     ],     "owned": true,     "ownerID": "12345",     "home": true,     "sourceTitle": "xyzabc",     "accessToken": "supersecretaccesstoken",     "publicAddress": "127.0.0.1",     "httpsRequired": true,     "synced": true,     "relay": true,     "dnsRebindingProtection": false,     "natLoopbackSupported": false,     "publicAddressMatches": false,     "presence": true,     "connection": [       {         "protocol": "https",         "address": "127.0.0.1",         "port": 32400,         "uri": "https://127-0-0-1.2ab6ce1a093d465e910def96cf4e4799.plex.direct:32400",         "local": true,         "status": 200,         "message": "OK"       }     ]   } ] ``` | *No links* |

Returns a list of Plex users in a JSON array.

Requires the `MANAGE_USERS` permission.

| Code | Description | Links |
| --- | --- | --- |
| 200 | Plex users  Media type  Controls `Accept` header.  ```json [   {     "id": "string",     "title": "string",     "username": "string",     "email": "string",     "thumb": "string"   } ] ``` | *No links* |

Retrieves current Tautulli settings.

| Code | Description | Links |
| --- | --- | --- |
| 200 | OK  Media type  Controls `Accept` header.  ```json {   "hostname": "tautulli.example.com",   "port": 8181,   "useSsl": true,   "apiKey": "string",   "externalUrl": "string" } ``` | *No links* |

Updates Tautulli settings with the provided values.

```json
{
  "hostname": "tautulli.example.com",
  "port": 8181,
  "useSsl": true,
  "apiKey": "string",
  "externalUrl": "string"
}
```

| Code | Description | Links |
| --- | --- | --- |
| 200 | Values were successfully updated  Media type  Controls `Accept` header.  ```json {   "hostname": "tautulli.example.com",   "port": 8181,   "useSsl": true,   "apiKey": "string",   "externalUrl": "string" } ``` | *No links* |

Returns all Radarr settings in a JSON array.

| Code | Description | Links |
| --- | --- | --- |
| 200 | Values were returned  Media type  Controls `Accept` header.  ```json [   {     "id": 0,     "name": "Radarr Main",     "hostname": "127.0.0.1",     "port": 7878,     "apiKey": "exampleapikey",     "useSsl": false,     "baseUrl": "string",     "activeProfileId": 1,     "activeProfileName": "720p/1080p",     "activeDirectory": "/movies",     "is4k": false,     "minimumAvailability": "In Cinema",     "isDefault": false,     "externalUrl": "http://radarr.example.com",     "syncEnabled": false,     "preventSearch": false   } ] ``` | *No links* |

Creates a new Radarr instance from the request body.

```json
{
  "name": "Radarr Main",
  "hostname": "127.0.0.1",
  "port": 7878,
  "apiKey": "exampleapikey",
  "useSsl": false,
  "baseUrl": "string",
  "activeProfileId": 1,
  "activeProfileName": "720p/1080p",
  "activeDirectory": "/movies",
  "is4k": false,
  "minimumAvailability": "In Cinema",
  "isDefault": false,
  "externalUrl": "http://radarr.example.com",
  "syncEnabled": false,
  "preventSearch": false
}
```

| Code | Description | Links |
| --- | --- | --- |
| 201 | New Radarr instance created  Media type  Controls `Accept` header.  ```json {   "id": 0,   "name": "Radarr Main",   "hostname": "127.0.0.1",   "port": 7878,   "apiKey": "exampleapikey",   "useSsl": false,   "baseUrl": "string",   "activeProfileId": 1,   "activeProfileName": "720p/1080p",   "activeDirectory": "/movies",   "is4k": false,   "minimumAvailability": "In Cinema",   "isDefault": false,   "externalUrl": "http://radarr.example.com",   "syncEnabled": false,   "preventSearch": false } ``` | *No links* |

Tests if the Radarr configuration is valid. Returns profiles and root folders on success.

```json
{
  "hostname": "127.0.0.1",
  "port": 7878,
  "apiKey": "yourapikey",
  "useSsl": false,
  "baseUrl": "string"
}
```

| Code | Description | Links |
| --- | --- | --- |
| 200 | Succesfully connected to Radarr instance  Media type  Controls `Accept` header.  ```json {   "profiles": [     {       "id": 1,       "name": "720p/1080p"     }   ] } ``` | *No links* |

Updates an existing Radarr instance with the provided values.

| Name | Description |
| --- | --- |
| radarrId   \*  integer  (  path  ) | Radarr instance ID |

```json
{
  "name": "Radarr Main",
  "hostname": "127.0.0.1",
  "port": 7878,
  "apiKey": "exampleapikey",
  "useSsl": false,
  "baseUrl": "string",
  "activeProfileId": 1,
  "activeProfileName": "720p/1080p",
  "activeDirectory": "/movies",
  "is4k": false,
  "minimumAvailability": "In Cinema",
  "isDefault": false,
  "externalUrl": "http://radarr.example.com",
  "syncEnabled": false,
  "preventSearch": false
}
```

| Code | Description | Links |
| --- | --- | --- |
| 200 | Radarr instance updated  Media type  Controls `Accept` header.  ```json {   "id": 0,   "name": "Radarr Main",   "hostname": "127.0.0.1",   "port": 7878,   "apiKey": "exampleapikey",   "useSsl": false,   "baseUrl": "string",   "activeProfileId": 1,   "activeProfileName": "720p/1080p",   "activeDirectory": "/movies",   "is4k": false,   "minimumAvailability": "In Cinema",   "isDefault": false,   "externalUrl": "http://radarr.example.com",   "syncEnabled": false,   "preventSearch": false } ``` | *No links* |

Deletes an existing Radarr instance based on the radarrId parameter.

| Name | Description |
| --- | --- |
| radarrId   \*  integer  (  path  ) | Radarr instance ID |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Radarr instance updated  Media type  Controls `Accept` header.  ```json {   "id": 0,   "name": "Radarr Main",   "hostname": "127.0.0.1",   "port": 7878,   "apiKey": "exampleapikey",   "useSsl": false,   "baseUrl": "string",   "activeProfileId": 1,   "activeProfileName": "720p/1080p",   "activeDirectory": "/movies",   "is4k": false,   "minimumAvailability": "In Cinema",   "isDefault": false,   "externalUrl": "http://radarr.example.com",   "syncEnabled": false,   "preventSearch": false } ``` | *No links* |

Returns a list of profiles available on the Radarr server instance in a JSON array.

| Name | Description |
| --- | --- |
| radarrId   \*  integer  (  path  ) | Radarr instance ID |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Returned list of profiles  Media type  Controls `Accept` header.  ```json [   {     "id": 1,     "name": "720p/1080p"   } ] ``` | *No links* |

Returns all Sonarr settings in a JSON array.

| Code | Description | Links |
| --- | --- | --- |
| 200 | Values were returned  Media type  Controls `Accept` header.  ```json [   {     "id": 0,     "name": "Sonarr Main",     "hostname": "127.0.0.1",     "port": 8989,     "apiKey": "exampleapikey",     "useSsl": false,     "baseUrl": "string",     "activeProfileId": 1,     "activeProfileName": "720p/1080p",     "activeDirectory": "/tv/",     "activeLanguageProfileId": 1,     "activeAnimeProfileId": 0,     "activeAnimeLanguageProfileId": 0,     "activeAnimeProfileName": "720p/1080p",     "activeAnimeDirectory": "string",     "is4k": false,     "enableSeasonFolders": false,     "isDefault": false,     "externalUrl": "http://radarr.example.com",     "syncEnabled": false,     "preventSearch": false   } ] ``` | *No links* |

Creates a new Sonarr instance from the request body.

```json
{
  "name": "Sonarr Main",
  "hostname": "127.0.0.1",
  "port": 8989,
  "apiKey": "exampleapikey",
  "useSsl": false,
  "baseUrl": "string",
  "activeProfileId": 1,
  "activeProfileName": "720p/1080p",
  "activeDirectory": "/tv/",
  "activeLanguageProfileId": 1,
  "activeAnimeProfileId": 0,
  "activeAnimeLanguageProfileId": 0,
  "activeAnimeProfileName": "720p/1080p",
  "activeAnimeDirectory": "string",
  "is4k": false,
  "enableSeasonFolders": false,
  "isDefault": false,
  "externalUrl": "http://radarr.example.com",
  "syncEnabled": false,
  "preventSearch": false
}
```

| Code | Description | Links |
| --- | --- | --- |
| 201 | New Sonarr instance created  Media type  Controls `Accept` header.  ```json {   "id": 0,   "name": "Sonarr Main",   "hostname": "127.0.0.1",   "port": 8989,   "apiKey": "exampleapikey",   "useSsl": false,   "baseUrl": "string",   "activeProfileId": 1,   "activeProfileName": "720p/1080p",   "activeDirectory": "/tv/",   "activeLanguageProfileId": 1,   "activeAnimeProfileId": 0,   "activeAnimeLanguageProfileId": 0,   "activeAnimeProfileName": "720p/1080p",   "activeAnimeDirectory": "string",   "is4k": false,   "enableSeasonFolders": false,   "isDefault": false,   "externalUrl": "http://radarr.example.com",   "syncEnabled": false,   "preventSearch": false } ``` | *No links* |

Tests if the Sonarr configuration is valid. Returns profiles and root folders on success.

```json
{
  "hostname": "127.0.0.1",
  "port": 8989,
  "apiKey": "yourapikey",
  "useSsl": false,
  "baseUrl": "string"
}
```

| Code | Description | Links |
| --- | --- | --- |
| 200 | Succesfully connected to Sonarr instance  Media type  Controls `Accept` header.  ```json {   "profiles": [     {       "id": 1,       "name": "720p/1080p"     }   ] } ``` | *No links* |

Deletes an existing Sonarr instance based on the sonarrId parameter.

| Name | Description |
| --- | --- |
| sonarrId   \*  integer  (  path  ) | Sonarr instance ID |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Sonarr instance updated  Media type  Controls `Accept` header.  ```json {   "id": 0,   "name": "Sonarr Main",   "hostname": "127.0.0.1",   "port": 8989,   "apiKey": "exampleapikey",   "useSsl": false,   "baseUrl": "string",   "activeProfileId": 1,   "activeProfileName": "720p/1080p",   "activeDirectory": "/tv/",   "activeLanguageProfileId": 1,   "activeAnimeProfileId": 0,   "activeAnimeLanguageProfileId": 0,   "activeAnimeProfileName": "720p/1080p",   "activeAnimeDirectory": "string",   "is4k": false,   "enableSeasonFolders": false,   "isDefault": false,   "externalUrl": "http://radarr.example.com",   "syncEnabled": false,   "preventSearch": false } ``` | *No links* |

Returns settings that are not protected or sensitive. Mainly used to determine if the application has been configured for the first time.

| Code | Description | Links |
| --- | --- | --- |
| 200 | Public settings returned  Media type  Controls `Accept` header.  ```json {   "initialized": false } ``` | *No links* |

Sets the app as initialized, allowing the user to navigate to pages other than the setup page.

| Code | Description | Links |
| --- | --- | --- |
| 200 | Public settings returned  Media type  Controls `Accept` header.  ```json {   "initialized": false } ``` | *No links* |

Invokes a specific job to run. Will return the new job status in JSON format.

| Name | Description |
| --- | --- |
| jobId   \*  string  (  path  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Invoked job returned  Media type  Controls `Accept` header.  ```json {   "id": "job-name",   "type": "process",   "interval": "short",   "name": "A Job Name",   "nextExecutionTime": "2020-09-02T05:02:23.000Z",   "running": false } ``` | *No links* |

Cancels a specific job. Will return the new job status in JSON format.

| Name | Description |
| --- | --- |
| jobId   \*  string  (  path  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Canceled job returned  Media type  Controls `Accept` header.  ```json {   "id": "job-name",   "type": "process",   "interval": "short",   "name": "A Job Name",   "nextExecutionTime": "2020-09-02T05:02:23.000Z",   "running": false } ``` | *No links* |

Re-registers the job with the schedule specified. Will return the job in JSON format.

| Name | Description |
| --- | --- |
| jobId   \*  string  (  path  ) |  |

```json
{
  "schedule": "0 */5 * * * *"
}
```

| Code | Description | Links |
| --- | --- | --- |
| 200 | Rescheduled job  Media type  Controls `Accept` header.  ```json {   "id": "job-name",   "type": "process",   "interval": "short",   "name": "A Job Name",   "nextExecutionTime": "2020-09-02T05:02:23.000Z",   "running": false } ``` | *No links* |

Retrieves a list of all active caches and their current stats.

| Code | Description | Links |
| --- | --- | --- |
| 200 | Caches returned  Media type  Controls `Accept` header.  ```json {   "imageCache": {     "tmdb": {       "size": 123456,       "imageCount": 123     }   },   "apiCaches": [     {       "id": "cache-id",       "name": "cache name",       "stats": {         "hits": 0,         "misses": 0,         "keys": 0,         "ksize": 0,         "vsize": 0       }     }   ] } ``` | *No links* |

Flushes all data from the cache ID provided

| Name | Description |
| --- | --- |
| cacheId   \*  string  (  path  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 204 | Flushed cache | *No links* |

Returns list of all log items and details

| Name | Description |
| --- | --- |
| take  number  (  query  ) |  |
| skip  number  (  query  ) |  |
| filter  string  (  query  ) | *Available values* : debug, info, warn, error  *Default value* : debug |
| search  string  (  query  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Server log returned  Media type  Controls `Accept` header.  ```json [   {     "label": "server",     "level": "info",     "message": "Server ready on port 5055",     "timestamp": "2020-12-15T16:20:00.069Z"   } ] ``` | *No links* |

Returns current email notification settings in a JSON object.

| Code | Description | Links |
| --- | --- | --- |
| 200 | Returned email settings  Media type  Controls `Accept` header.  ```json {   "enabled": false,   "types": 2,   "options": {     "emailFrom": "no-reply@example.com",     "senderName": "Overseerr",     "smtpHost": "127.0.0.1",     "smtpPort": 465,     "secure": false,     "ignoreTls": false,     "requireTls": false,     "authUser": "string",     "authPass": "string",     "allowSelfSigned": false   } } ``` | *No links* |

Updates email notification settings with provided values

```json
{
  "enabled": false,
  "types": 2,
  "options": {
    "emailFrom": "no-reply@example.com",
    "senderName": "Overseerr",
    "smtpHost": "127.0.0.1",
    "smtpPort": 465,
    "secure": false,
    "ignoreTls": false,
    "requireTls": false,
    "authUser": "string",
    "authPass": "string",
    "allowSelfSigned": false
  }
}
```

| Code | Description | Links |
| --- | --- | --- |
| 200 | Values were sucessfully updated  Media type  Controls `Accept` header.  ```json {   "enabled": false,   "types": 2,   "options": {     "emailFrom": "no-reply@example.com",     "senderName": "Overseerr",     "smtpHost": "127.0.0.1",     "smtpPort": 465,     "secure": false,     "ignoreTls": false,     "requireTls": false,     "authUser": "string",     "authPass": "string",     "allowSelfSigned": false   } } ``` | *No links* |

Sends a test notification to the email agent.

```json
{
  "enabled": false,
  "types": 2,
  "options": {
    "emailFrom": "no-reply@example.com",
    "senderName": "Overseerr",
    "smtpHost": "127.0.0.1",
    "smtpPort": 465,
    "secure": false,
    "ignoreTls": false,
    "requireTls": false,
    "authUser": "string",
    "authPass": "string",
    "allowSelfSigned": false
  }
}
```

| Code | Description | Links |
| --- | --- | --- |
| 204 | Test notification attempted | *No links* |

Returns current Discord notification settings in a JSON object.

| Code | Description | Links |
| --- | --- | --- |
| 200 | Returned Discord settings  Media type  Controls `Accept` header.  ```json {   "enabled": false,   "types": 2,   "options": {     "botUsername": "string",     "botAvatarUrl": "string",     "webhookUrl": "string",     "enableMentions": true   } } ``` | *No links* |

Updates Discord notification settings with the provided values.

```json
{
  "enabled": false,
  "types": 2,
  "options": {
    "botUsername": "string",
    "botAvatarUrl": "string",
    "webhookUrl": "string",
    "enableMentions": true
  }
}
```

| Code | Description | Links |
| --- | --- | --- |
| 200 | Values were sucessfully updated  Media type  Controls `Accept` header.  ```json {   "enabled": false,   "types": 2,   "options": {     "botUsername": "string",     "botAvatarUrl": "string",     "webhookUrl": "string",     "enableMentions": true   } } ``` | *No links* |

Sends a test notification to the Discord agent.

```json
{
  "enabled": false,
  "types": 2,
  "options": {
    "botUsername": "string",
    "botAvatarUrl": "string",
    "webhookUrl": "string",
    "enableMentions": true
  }
}
```

| Code | Description | Links |
| --- | --- | --- |
| 204 | Test notification attempted | *No links* |

Returns current LunaSea notification settings in a JSON object.

| Code | Description | Links |
| --- | --- | --- |
| 200 | Returned LunaSea settings  Media type  Controls `Accept` header.  ```json {   "enabled": false,   "types": 2,   "options": {     "webhookUrl": "string",     "profileName": "string"   } } ``` | *No links* |

Updates LunaSea notification settings with the provided values.

```json
{
  "enabled": false,
  "types": 2,
  "options": {
    "webhookUrl": "string",
    "profileName": "string"
  }
}
```

| Code | Description | Links |
| --- | --- | --- |
| 200 | Values were sucessfully updated  Media type  Controls `Accept` header.  ```json {   "enabled": false,   "types": 2,   "options": {     "webhookUrl": "string",     "profileName": "string"   } } ``` | *No links* |

Sends a test notification to the LunaSea agent.

```json
{
  "enabled": false,
  "types": 2,
  "options": {
    "webhookUrl": "string",
    "profileName": "string"
  }
}
```

| Code | Description | Links |
| --- | --- | --- |
| 204 | Test notification attempted | *No links* |

Returns current Pushbullet notification settings in a JSON object.

| Code | Description | Links |
| --- | --- | --- |
| 200 | Returned Pushbullet settings  Media type  Controls `Accept` header.  ```json {   "enabled": false,   "types": 2,   "options": {     "accessToken": "string",     "channelTag": "string"   } } ``` | *No links* |

Update Pushbullet notification settings with the provided values.

```json
{
  "enabled": false,
  "types": 2,
  "options": {
    "accessToken": "string",
    "channelTag": "string"
  }
}
```

| Code | Description | Links |
| --- | --- | --- |
| 200 | Values were sucessfully updated  Media type  Controls `Accept` header.  ```json {   "enabled": false,   "types": 2,   "options": {     "accessToken": "string",     "channelTag": "string"   } } ``` | *No links* |

Sends a test notification to the Pushbullet agent.

```json
{
  "enabled": false,
  "types": 2,
  "options": {
    "accessToken": "string",
    "channelTag": "string"
  }
}
```

| Code | Description | Links |
| --- | --- | --- |
| 204 | Test notification attempted | *No links* |

Returns current Pushover notification settings in a JSON object.

| Code | Description | Links |
| --- | --- | --- |
| 200 | Returned Pushover settings  Media type  Controls `Accept` header.  ```json {   "enabled": false,   "types": 2,   "options": {     "accessToken": "string",     "userToken": "string",     "sound": "string"   } } ``` | *No links* |

Update Pushover notification settings with the provided values.

```json
{
  "enabled": false,
  "types": 2,
  "options": {
    "accessToken": "string",
    "userToken": "string",
    "sound": "string"
  }
}
```

| Code | Description | Links |
| --- | --- | --- |
| 200 | Values were sucessfully updated  Media type  Controls `Accept` header.  ```json {   "enabled": false,   "types": 2,   "options": {     "accessToken": "string",     "userToken": "string",     "sound": "string"   } } ``` | *No links* |

Sends a test notification to the Pushover agent.

```json
{
  "enabled": false,
  "types": 2,
  "options": {
    "accessToken": "string",
    "userToken": "string",
    "sound": "string"
  }
}
```

| Code | Description | Links |
| --- | --- | --- |
| 204 | Test notification attempted | *No links* |

Returns valid Pushover sound options in a JSON array.

| Name | Description |
| --- | --- |
| token   \*  string  (  query  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Returned Pushover settings  Media type  Controls `Accept` header.  ```json [   {     "name": "string",     "description": "string"   } ] ``` | *No links* |

Returns current Gotify notification settings in a JSON object.

| Code | Description | Links |
| --- | --- | --- |
| 200 | Returned Gotify settings  Media type  Controls `Accept` header.  ```json {   "enabled": false,   "types": 2,   "options": {     "url": "string",     "token": "string"   } } ``` | *No links* |

Update Gotify notification settings with the provided values.

```json
{
  "enabled": false,
  "types": 2,
  "options": {
    "url": "string",
    "token": "string"
  }
}
```

| Code | Description | Links |
| --- | --- | --- |
| 200 | Values were sucessfully updated  Media type  Controls `Accept` header.  ```json {   "enabled": false,   "types": 2,   "options": {     "url": "string",     "token": "string"   } } ``` | *No links* |

Sends a test notification to the Gotify agent.

```json
{
  "enabled": false,
  "types": 2,
  "options": {
    "url": "string",
    "token": "string"
  }
}
```

| Code | Description | Links |
| --- | --- | --- |
| 204 | Test notification attempted | *No links* |

Returns current Slack notification settings in a JSON object.

| Code | Description | Links |
| --- | --- | --- |
| 200 | Returned slack settings  Media type  Controls `Accept` header.  ```json {   "enabled": false,   "types": 2,   "options": {     "webhookUrl": "string"   } } ``` | *No links* |

Updates Slack notification settings with the provided values.

```json
{
  "enabled": false,
  "types": 2,
  "options": {
    "webhookUrl": "string"
  }
}
```

| Code | Description | Links |
| --- | --- | --- |
| 200 | Values were sucessfully updated  Media type  Controls `Accept` header.  ```json {   "enabled": false,   "types": 2,   "options": {     "webhookUrl": "string"   } } ``` | *No links* |

Sends a test notification to the Slack agent.

```json
{
  "enabled": false,
  "types": 2,
  "options": {
    "webhookUrl": "string"
  }
}
```

| Code | Description | Links |
| --- | --- | --- |
| 204 | Test notification attempted | *No links* |

Returns current Telegram notification settings in a JSON object.

| Code | Description | Links |
| --- | --- | --- |
| 200 | Returned Telegram settings  Media type  Controls `Accept` header.  ```json {   "enabled": false,   "types": 2,   "options": {     "botUsername": "string",     "botAPI": "string",     "chatId": "string",     "sendSilently": true   } } ``` | *No links* |

Update Telegram notification settings with the provided values.

```json
{
  "enabled": false,
  "types": 2,
  "options": {
    "botUsername": "string",
    "botAPI": "string",
    "chatId": "string",
    "sendSilently": true
  }
}
```

| Code | Description | Links |
| --- | --- | --- |
| 200 | Values were sucessfully updated  Media type  Controls `Accept` header.  ```json {   "enabled": false,   "types": 2,   "options": {     "botUsername": "string",     "botAPI": "string",     "chatId": "string",     "sendSilently": true   } } ``` | *No links* |

Sends a test notification to the Telegram agent.

```json
{
  "enabled": false,
  "types": 2,
  "options": {
    "botUsername": "string",
    "botAPI": "string",
    "chatId": "string",
    "sendSilently": true
  }
}
```

| Code | Description | Links |
| --- | --- | --- |
| 204 | Test notification attempted | *No links* |

Returns current Web Push notification settings in a JSON object.

| Code | Description | Links |
| --- | --- | --- |
| 200 | Returned web push settings  Media type  Controls `Accept` header.  ```json {   "enabled": false,   "types": 2 } ``` | *No links* |

Updates Web Push notification settings with the provided values.

```json
{
  "enabled": false,
  "types": 2
}
```

| Code | Description | Links |
| --- | --- | --- |
| 200 | Values were sucessfully updated  Media type  Controls `Accept` header.  ```json {   "enabled": false,   "types": 2 } ``` | *No links* |

Sends a test notification to the Web Push agent.

```json
{
  "enabled": false,
  "types": 2
}
```

| Code | Description | Links |
| --- | --- | --- |
| 204 | Test notification attempted | *No links* |

Returns current webhook notification settings in a JSON object.

| Code | Description | Links |
| --- | --- | --- |
| 200 | Returned webhook settings  Media type  Controls `Accept` header.  ```json {   "enabled": false,   "types": 2,   "options": {     "webhookUrl": "string",     "authHeader": "string",     "jsonPayload": "string"   } } ``` | *No links* |

Updates webhook notification settings with the provided values.

```json
{
  "enabled": false,
  "types": 2,
  "options": {
    "webhookUrl": "string",
    "authHeader": "string",
    "jsonPayload": "string"
  }
}
```

| Code | Description | Links |
| --- | --- | --- |
| 200 | Values were sucessfully updated  Media type  Controls `Accept` header.  ```json {   "enabled": false,   "types": 2,   "options": {     "webhookUrl": "string",     "authHeader": "string",     "jsonPayload": "string"   } } ``` | *No links* |

Sends a test notification to the webhook agent.

```json
{
  "enabled": false,
  "types": 2,
  "options": {
    "webhookUrl": "string",
    "authHeader": "string",
    "jsonPayload": "string"
  }
}
```

| Code | Description | Links |
| --- | --- | --- |
| 204 | Test notification attempted | *No links* |

Returns all discovery sliders. Built-in and custom made.

| Code | Description | Links |
| --- | --- | --- |
| 200 | Returned all discovery sliders  Media type  Controls `Accept` header.  ```json [   {     "id": 1,     "type": 1,     "title": "string",     "isBuiltIn": true,     "enabled": true,     "data": "1234"   } ] ``` | *No links* |

Batch update all sliders at once. Should also be used for creation. Will only update sliders provided and will not delete any sliders not present in the request. If a slider is missing a required field, it will be ignored. Requires the `ADMIN` permission.

```json
[
  {
    "id": 1,
    "type": 1,
    "title": "string",
    "isBuiltIn": true,
    "enabled": true,
    "data": "1234"
  }
]
```

| Code | Description | Links |
| --- | --- | --- |
| 200 | Returned all newly updated discovery sliders  Media type  Controls `Accept` header.  ```json [   {     "id": 1,     "type": 1,     "title": "string",     "isBuiltIn": true,     "enabled": true,     "data": "1234"   } ] ``` | *No links* |

Updates a single slider and return the newly updated slider. Requires the `ADMIN` permission.

| Name | Description |
| --- | --- |
| sliderId   \*  number  (  path  ) |  |

```json
{
  "title": "Slider Title",
  "type": 1,
  "data": "1"
}
```

| Code | Description | Links |
| --- | --- | --- |
| 200 | Returns newly added discovery slider  Media type  Controls `Accept` header.  ```json {   "id": 1,   "type": 1,   "title": "string",   "isBuiltIn": true,   "enabled": true,   "data": "1234" } ``` | *No links* |

Deletes the slider with the provided sliderId. Requires the `ADMIN` permission.

| Name | Description |
| --- | --- |
| sliderId   \*  number  (  path  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Slider successfully deleted  Media type  Controls `Accept` header.  ```json {   "id": 1,   "type": 1,   "title": "string",   "isBuiltIn": true,   "enabled": true,   "data": "1234" } ``` | *No links* |

Add a single slider and return the newly created slider. Requires the `ADMIN` permission.

```json
{
  "title": "New Slider",
  "type": 1,
  "data": "1"
}
```

| Code | Description | Links |
| --- | --- | --- |
| 200 | Returns newly added discovery slider  Media type  Controls `Accept` header.  ```json {   "id": 1,   "type": 1,   "title": "string",   "isBuiltIn": true,   "enabled": true,   "data": "1234" } ``` | *No links* |

Resets all discovery sliders to the default values. Requires the `ADMIN` permission.

| Code | Description | Links |
| --- | --- | --- |
| 204 | All sliders reset to defaults | *No links* |

Returns current server stats in a JSON object.

| Code | Description | Links |
| --- | --- | --- |
| 200 | Returned about settings  Media type  Controls `Accept` header.  ```json {   "version": "1.0.0",   "totalRequests": 100,   "totalMediaItems": 100,   "tz": "Asia/Tokyo",   "appDataPath": "/app/config" } ``` | *No links* |

### [auth](https://api-docs.overseerr.dev/#/auth)

Endpoints related to logging in or out, and the currently authenticated user.

Returns the currently logged-in user.

| Code | Description | Links |
| --- | --- | --- |
| 200 | Object containing the logged-in user in JSON  Media type  Controls `Accept` header.  ```json {   "id": 1,   "email": "hey@itsme.com",   "username": "string",   "plexToken": "string",   "plexUsername": "string",   "userType": 1,   "permissions": 0,   "avatar": "string",   "createdAt": "2020-09-02T05:02:23.000Z",   "updatedAt": "2020-09-02T05:02:23.000Z",   "requestCount": 5 } ``` | *No links* |

Takes an `authToken` (Plex token) to log the user in. Generates a session cookie for use in further requests. If the user does not exist, and there are no other users, then a user will be created with full admin privileges. If a user logs in with access to the main Plex server, they will also have an account created, but without any permissions.

```json
{
  "authToken": "string"
}
```

| Code | Description | Links |
| --- | --- | --- |
| 200 | OK  Media type  Controls `Accept` header.  ```json {   "id": 1,   "email": "hey@itsme.com",   "username": "string",   "plexToken": "string",   "plexUsername": "string",   "userType": 1,   "permissions": 0,   "avatar": "string",   "createdAt": "2020-09-02T05:02:23.000Z",   "updatedAt": "2020-09-02T05:02:23.000Z",   "requestCount": 5 } ``` | *No links* |

Takes an `email` and a `password` to log the user in. Generates a session cookie for use in further requests.

```json
{
  "email": "string",
  "password": "string"
}
```

| Code | Description | Links |
| --- | --- | --- |
| 200 | OK  Media type  Controls `Accept` header.  ```json {   "id": 1,   "email": "hey@itsme.com",   "username": "string",   "plexToken": "string",   "plexUsername": "string",   "userType": 1,   "permissions": 0,   "avatar": "string",   "createdAt": "2020-09-02T05:02:23.000Z",   "updatedAt": "2020-09-02T05:02:23.000Z",   "requestCount": 5 } ``` | *No links* |

Completely clear the session cookie and associated values, effectively signing the user out.

| Code | Description | Links |
| --- | --- | --- |
| 200 | OK  Media type  Controls `Accept` header.  ```json {   "status": "ok" } ``` | *No links* |

### [users](https://api-docs.overseerr.dev/#/users)

Endpoints related to user management.

Returns a list of Plex users in a JSON array.

Requires the `MANAGE_USERS` permission.

| Code | Description | Links |
| --- | --- | --- |
| 200 | Plex users  Media type  Controls `Accept` header.  ```json [   {     "id": "string",     "title": "string",     "username": "string",     "email": "string",     "thumb": "string"   } ] ``` | *No links* |

Returns the currently logged-in user.

| Code | Description | Links |
| --- | --- | --- |
| 200 | Object containing the logged-in user in JSON  Media type  Controls `Accept` header.  ```json {   "id": 1,   "email": "hey@itsme.com",   "username": "string",   "plexToken": "string",   "plexUsername": "string",   "userType": 1,   "permissions": 0,   "avatar": "string",   "createdAt": "2020-09-02T05:02:23.000Z",   "updatedAt": "2020-09-02T05:02:23.000Z",   "requestCount": 5 } ``` | *No links* |

Sends a reset password email to the email if the user exists

| Code | Description | Links |
| --- | --- | --- |
| 200 | OK  Media type  Controls `Accept` header.  ```json {   "status": "ok" } ``` | *No links* |

Resets the password for a user if the given guid is connected to a user

| Name | Description |
| --- | --- |
| guid   \*  string  (  path  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | OK  Media type  Controls `Accept` header.  ```json {   "status": "ok" } ``` | *No links* |

Returns all users in a JSON object.

| Name | Description |
| --- | --- |
| take  number  (  query  ) |  |
| skip  number  (  query  ) |  |
| sort  string  (  query  ) | *Available values* : created, updated, requests, displayname  *Default value* : created |

| Code | Description | Links |
| --- | --- | --- |
| 200 | A JSON array of all users  Media type  Controls `Accept` header.  ```json {   "pageInfo": {     "page": 1,     "pages": 10,     "results": 100   },   "results": [     {       "id": 1,       "email": "hey@itsme.com",       "username": "string",       "plexToken": "string",       "plexUsername": "string",       "userType": 1,       "permissions": 0,       "avatar": "string",       "createdAt": "2020-09-02T05:02:23.000Z",       "updatedAt": "2020-09-02T05:02:23.000Z",       "requestCount": 5     }   ] } ``` | *No links* |

Creates a new user. Requires the `MANAGE_USERS` permission.

```json
{
  "email": "hey@itsme.com",
  "username": "string",
  "permissions": 0
}
```

| Code | Description | Links |
| --- | --- | --- |
| 201 | The created user  Media type  Controls `Accept` header.  ```json {   "id": 1,   "email": "hey@itsme.com",   "username": "string",   "plexToken": "string",   "plexUsername": "string",   "userType": 1,   "permissions": 0,   "avatar": "string",   "createdAt": "2020-09-02T05:02:23.000Z",   "updatedAt": "2020-09-02T05:02:23.000Z",   "requestCount": 5 } ``` | *No links* |

Update users with given IDs with provided values in request `body.settings`. You cannot update users' Plex tokens through this request.

Requires the `MANAGE_USERS` permission.

```json
{
  "ids": [
    0
  ],
  "permissions": 0
}
```

| Code | Description | Links |
| --- | --- | --- |
| 200 | Successfully updated user details  Media type  Controls `Accept` header.  ```json [   {     "id": 1,     "email": "hey@itsme.com",     "username": "string",     "plexToken": "string",     "plexUsername": "string",     "userType": 1,     "permissions": 0,     "avatar": "string",     "createdAt": "2020-09-02T05:02:23.000Z",     "updatedAt": "2020-09-02T05:02:23.000Z",     "requestCount": 5   } ] ``` | *No links* |

Fetches and imports users from the Plex server. If a list of Plex IDs is provided in the request body, only the specified users will be imported. Otherwise, all users will be imported.

Requires the `MANAGE_USERS` permission.

```json
{
  "plexIds": [
    "string"
  ]
}
```

| Code | Description | Links |
| --- | --- | --- |
| 201 | A list of the newly created users  Media type  Controls `Accept` header.  ```json [   {     "id": 1,     "email": "hey@itsme.com",     "username": "string",     "plexToken": "string",     "plexUsername": "string",     "userType": 1,     "permissions": 0,     "avatar": "string",     "createdAt": "2020-09-02T05:02:23.000Z",     "updatedAt": "2020-09-02T05:02:23.000Z",     "requestCount": 5   } ] ``` | *No links* |

Registers a web push subscription for the logged-in user

```json
{
  "endpoint": "string",
  "auth": "string",
  "p256dh": "string"
}
```

| Code | Description | Links |
| --- | --- | --- |
| 204 | Successfully registered push subscription | *No links* |

Retrieves user details in a JSON object. Requires the `MANAGE_USERS` permission.

| Name | Description |
| --- | --- |
| userId   \*  number  (  path  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Users details in JSON  Media type  Controls `Accept` header.  ```json {   "id": 1,   "email": "hey@itsme.com",   "username": "string",   "plexToken": "string",   "plexUsername": "string",   "userType": 1,   "permissions": 0,   "avatar": "string",   "createdAt": "2020-09-02T05:02:23.000Z",   "updatedAt": "2020-09-02T05:02:23.000Z",   "requestCount": 5 } ``` | *No links* |

Update a user with the provided values. You cannot update a user's Plex token through this request.

Requires the `MANAGE_USERS` permission.

| Name | Description |
| --- | --- |
| userId   \*  number  (  path  ) |  |

```json
{
  "username": "string",
  "permissions": 0
}
```

| Code | Description | Links |
| --- | --- | --- |
| 200 | Successfully updated user details  Media type  Controls `Accept` header.  ```json {   "id": 1,   "email": "hey@itsme.com",   "username": "string",   "plexToken": "string",   "plexUsername": "string",   "userType": 1,   "permissions": 0,   "avatar": "string",   "createdAt": "2020-09-02T05:02:23.000Z",   "updatedAt": "2020-09-02T05:02:23.000Z",   "requestCount": 5 } ``` | *No links* |

Deletes the user with the provided userId. Requires the `MANAGE_USERS` permission.

| Name | Description |
| --- | --- |
| userId   \*  number  (  path  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | User successfully deleted  Media type  Controls `Accept` header.  ```json {   "id": 1,   "email": "hey@itsme.com",   "username": "string",   "plexToken": "string",   "plexUsername": "string",   "userType": 1,   "permissions": 0,   "avatar": "string",   "createdAt": "2020-09-02T05:02:23.000Z",   "updatedAt": "2020-09-02T05:02:23.000Z",   "requestCount": 5 } ``` | *No links* |

Retrieves a user's requests in a JSON object.

| Name | Description |
| --- | --- |
| userId   \*  number  (  path  ) |  |
| take  number  (  query  ) |  |
| skip  number  (  query  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | User's requests returned  Media type  Controls `Accept` header.  ```json {   "pageInfo": {     "page": 1,     "pages": 10,     "results": 100   },   "results": [     {       "id": 123,       "status": 0,       "media": {         "id": 0,         "tmdbId": 0,         "tvdbId": 0,         "status": 0,         "requests": [           "string"         ],         "createdAt": "2020-09-12T10:00:27.000Z",         "updatedAt": "2020-09-12T10:00:27.000Z"       },       "createdAt": "2020-09-12T10:00:27.000Z",       "updatedAt": "2020-09-12T10:00:27.000Z",       "requestedBy": {         "id": 1,         "email": "hey@itsme.com",         "username": "string",         "plexToken": "string",         "plexUsername": "string",         "userType": 1,         "permissions": 0,         "avatar": "string",         "createdAt": "2020-09-02T05:02:23.000Z",         "updatedAt": "2020-09-02T05:02:23.000Z",         "requestCount": 5       },       "modifiedBy": {         "id": 1,         "email": "hey@itsme.com",         "username": "string",         "plexToken": "string",         "plexUsername": "string",         "userType": 1,         "permissions": 0,         "avatar": "string",         "createdAt": "2020-09-02T05:02:23.000Z",         "updatedAt": "2020-09-02T05:02:23.000Z",         "requestCount": 5       },       "is4k": false,       "serverId": 0,       "profileId": 0,       "rootFolder": "string"     }   ] } ``` | *No links* |

Returns quota details for a user in a JSON object. Requires `MANAGE_USERS` permission if viewing other users.

| Name | Description |
| --- | --- |
| userId   \*  number  (  path  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | User quota details in JSON  Media type  Controls `Accept` header.  ```json {   "movie": {     "days": 7,     "limit": 10,     "used": 6,     "remaining": 4,     "restricted": false   },   "tv": {     "days": 7,     "limit": 10,     "used": 6,     "remaining": 4,     "restricted": false   } } ``` | *No links* |

Retrieves a user's Plex Watchlist in a JSON object.

| Name | Description |
| --- | --- |
| userId   \*  number  (  path  ) |  |
| page  number  (  query  ) | *Default value* : 1 |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Watchlist data returned  Media type  Controls `Accept` header.  ```json {   "page": 0,   "totalPages": 0,   "totalResults": 0,   "results": [     {       "tmdbId": 1,       "ratingKey": "string",       "type": "string",       "title": "string"     }   ] } ``` | *No links* |

Returns general settings for a specific user. Requires `MANAGE_USERS` permission if viewing other users.

| Name | Description |
| --- | --- |
| userId   \*  number  (  path  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | User general settings returned  Media type  Controls `Accept` header.  ```json {   "username": "Mr User" } ``` | *No links* |

Updates and returns general settings for a specific user. Requires `MANAGE_USERS` permission if editing other users.

| Name | Description |
| --- | --- |
| userId   \*  number  (  path  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Updated user general settings returned  Media type  Controls `Accept` header.  ```json {   "username": "Mr User" } ``` | *No links* |

Returns important data for the password page to function correctly. Requires `MANAGE_USERS` permission if viewing other users.

| Name | Description |
| --- | --- |
| userId   \*  number  (  path  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | User password page information returned  Media type  Controls `Accept` header.  ```json {   "hasPassword": true } ``` | *No links* |

Updates a user's password. Requires `MANAGE_USERS` permission if editing other users.

| Name | Description |
| --- | --- |
| userId   \*  number  (  path  ) |  |

```json
{
  "currentPassword": "string",
  "newPassword": "string"
}
```

| Code | Description | Links |
| --- | --- | --- |
| 204 | User password updated | *No links* |

Returns notification settings for a specific user. Requires `MANAGE_USERS` permission if viewing other users.

| Name | Description |
| --- | --- |
| userId   \*  number  (  path  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | User notification settings returned  Media type  Controls `Accept` header.  ```json {   "notificationTypes": {     "discord": 0,     "email": 0,     "pushbullet": 0,     "pushover": 0,     "slack": 0,     "telegram": 0,     "webhook": 0,     "webpush": 0   },   "emailEnabled": true,   "pgpKey": "string",   "discordEnabled": true,   "discordEnabledTypes": 0,   "discordId": "string",   "pushbulletAccessToken": "string",   "pushoverApplicationToken": "string",   "pushoverUserKey": "string",   "pushoverSound": "string",   "telegramEnabled": true,   "telegramBotUsername": "string",   "telegramChatId": "string",   "telegramSendSilently": true } ``` | *No links* |

Updates and returns notification settings for a specific user. Requires `MANAGE_USERS` permission if editing other users.

| Name | Description |
| --- | --- |
| userId   \*  number  (  path  ) |  |

```json
{
  "notificationTypes": {
    "discord": 0,
    "email": 0,
    "pushbullet": 0,
    "pushover": 0,
    "slack": 0,
    "telegram": 0,
    "webhook": 0,
    "webpush": 0
  },
  "emailEnabled": true,
  "pgpKey": "string",
  "discordEnabled": true,
  "discordEnabledTypes": 0,
  "discordId": "string",
  "pushbulletAccessToken": "string",
  "pushoverApplicationToken": "string",
  "pushoverUserKey": "string",
  "pushoverSound": "string",
  "telegramEnabled": true,
  "telegramBotUsername": "string",
  "telegramChatId": "string",
  "telegramSendSilently": true
}
```

| Code | Description | Links |
| --- | --- | --- |
| 200 | Updated user notification settings returned  Media type  Controls `Accept` header.  ```json {   "notificationTypes": {     "discord": 0,     "email": 0,     "pushbullet": 0,     "pushover": 0,     "slack": 0,     "telegram": 0,     "webhook": 0,     "webpush": 0   },   "emailEnabled": true,   "pgpKey": "string",   "discordEnabled": true,   "discordEnabledTypes": 0,   "discordId": "string",   "pushbulletAccessToken": "string",   "pushoverApplicationToken": "string",   "pushoverUserKey": "string",   "pushoverSound": "string",   "telegramEnabled": true,   "telegramBotUsername": "string",   "telegramChatId": "string",   "telegramSendSilently": true } ``` | *No links* |

Returns permission settings for a specific user. Requires `MANAGE_USERS` permission if viewing other users.

| Name | Description |
| --- | --- |
| userId   \*  number  (  path  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | User permission settings returned  Media type  Controls `Accept` header.  ```json {   "permissions": 2 } ``` | *No links* |

Updates and returns permission settings for a specific user. Requires `MANAGE_USERS` permission if editing other users.

| Name | Description |
| --- | --- |
| userId   \*  number  (  path  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Updated user general settings returned  Media type  Controls `Accept` header.  ```json {   "permissions": 2 } ``` | *No links* |

Returns play count, play duration, and recently watched media.

Requires the `ADMIN` permission to fetch results for other users.

| Name | Description |
| --- | --- |
| userId   \*  number  (  path  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Users  Media type  Controls `Accept` header.  ```json {   "recentlyWatched": [     {       "id": 0,       "tmdbId": 0,       "tvdbId": 0,       "status": 0,       "requests": [         {           "id": 123,           "status": 0,           "media": "string",           "createdAt": "2020-09-12T10:00:27.000Z",           "updatedAt": "2020-09-12T10:00:27.000Z",           "requestedBy": {             "id": 1,             "email": "hey@itsme.com",             "username": "string",             "plexToken": "string",             "plexUsername": "string",             "userType": 1,             "permissions": 0,             "avatar": "string",             "createdAt": "2020-09-02T05:02:23.000Z",             "updatedAt": "2020-09-02T05:02:23.000Z",             "requestCount": 5           },           "modifiedBy": {             "id": 1,             "email": "hey@itsme.com",             "username": "string",             "plexToken": "string",             "plexUsername": "string",             "userType": 1,             "permissions": 0,             "avatar": "string",             "createdAt": "2020-09-02T05:02:23.000Z",             "updatedAt": "2020-09-02T05:02:23.000Z",             "requestCount": 5           },           "is4k": false,           "serverId": 0,           "profileId": 0,           "rootFolder": "string"         }       ],       "createdAt": "2020-09-12T10:00:27.000Z",       "updatedAt": "2020-09-12T10:00:27.000Z"     }   ],   "playCount": 0 } ``` | *No links* |

### [search](https://api-docs.overseerr.dev/#/search)

Endpoints related to search and discovery.

Returns a list of movies, TV shows, or people a JSON object.

| Name | Description |
| --- | --- |
| query   \*  string  (  query  ) |  |
| page  number  (  query  ) | *Default value* : 1 |
| language  string  (  query  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Results  Media type  Controls `Accept` header.  ```json {   "page": 1,   "totalPages": 20,   "totalResults": 200,   "results": [     {       "id": 1234,       "mediaType": "string",       "popularity": 10,       "posterPath": "string",       "backdropPath": "string",       "voteCount": 0,       "voteAverage": 0,       "genreIds": [         0       ],       "overview": "Overview of the movie",       "originalLanguage": "en",       "title": "Movie Title",       "originalTitle": "Original Movie Title",       "releaseDate": "string",       "adult": false,       "video": false,       "mediaInfo": {         "id": 0,         "tmdbId": 0,         "tvdbId": 0,         "status": 0,         "requests": [           {             "id": 123,             "status": 0,             "media": "string",             "createdAt": "2020-09-12T10:00:27.000Z",             "updatedAt": "2020-09-12T10:00:27.000Z",             "requestedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "modifiedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "is4k": false,             "serverId": 0,             "profileId": 0,             "rootFolder": "string"           }         ],         "createdAt": "2020-09-12T10:00:27.000Z",         "updatedAt": "2020-09-12T10:00:27.000Z"       }     },     {       "id": 1234,       "mediaType": "string",       "popularity": 10,       "posterPath": "string",       "backdropPath": "string",       "voteCount": 0,       "voteAverage": 0,       "genreIds": [         0       ],       "overview": "Overview of the movie",       "originalLanguage": "en",       "name": "TV Show Name",       "originalName": "Original TV Show Name",       "originCountry": [         "string"       ],       "firstAirDate": "string",       "mediaInfo": {         "id": 0,         "tmdbId": 0,         "tvdbId": 0,         "status": 0,         "requests": [           {             "id": 123,             "status": 0,             "media": "string",             "createdAt": "2020-09-12T10:00:27.000Z",             "updatedAt": "2020-09-12T10:00:27.000Z",             "requestedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "modifiedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "is4k": false,             "serverId": 0,             "profileId": 0,             "rootFolder": "string"           }         ],         "createdAt": "2020-09-12T10:00:27.000Z",         "updatedAt": "2020-09-12T10:00:27.000Z"       }     },     {       "id": 12345,       "profilePath": "string",       "adult": false,       "mediaType": "person",       "knownFor": [         {           "id": 1234,           "mediaType": "string",           "popularity": 10,           "posterPath": "string",           "backdropPath": "string",           "voteCount": 0,           "voteAverage": 0,           "genreIds": [             0           ],           "overview": "Overview of the movie",           "originalLanguage": "en",           "title": "Movie Title",           "originalTitle": "Original Movie Title",           "releaseDate": "string",           "adult": false,           "video": false,           "mediaInfo": {             "id": 0,             "tmdbId": 0,             "tvdbId": 0,             "status": 0,             "requests": [               {                 "id": 123,                 "status": 0,                 "media": "string",                 "createdAt": "2020-09-12T10:00:27.000Z",                 "updatedAt": "2020-09-12T10:00:27.000Z",                 "requestedBy": {                   "id": 1,                   "email": "hey@itsme.com",                   "username": "string",                   "plexToken": "string",                   "plexUsername": "string",                   "userType": 1,                   "permissions": 0,                   "avatar": "string",                   "createdAt": "2020-09-02T05:02:23.000Z",                   "updatedAt": "2020-09-02T05:02:23.000Z",                   "requestCount": 5                 },                 "modifiedBy": {                   "id": 1,                   "email": "hey@itsme.com",                   "username": "string",                   "plexToken": "string",                   "plexUsername": "string",                   "userType": 1,                   "permissions": 0,                   "avatar": "string",                   "createdAt": "2020-09-02T05:02:23.000Z",                   "updatedAt": "2020-09-02T05:02:23.000Z",                   "requestCount": 5                 },                 "is4k": false,                 "serverId": 0,                 "profileId": 0,                 "rootFolder": "string"               }             ],             "createdAt": "2020-09-12T10:00:27.000Z",             "updatedAt": "2020-09-12T10:00:27.000Z"           }         },         {           "id": 1234,           "mediaType": "string",           "popularity": 10,           "posterPath": "string",           "backdropPath": "string",           "voteCount": 0,           "voteAverage": 0,           "genreIds": [             0           ],           "overview": "Overview of the movie",           "originalLanguage": "en",           "name": "TV Show Name",           "originalName": "Original TV Show Name",           "originCountry": [             "string"           ],           "firstAirDate": "string",           "mediaInfo": {             "id": 0,             "tmdbId": 0,             "tvdbId": 0,             "status": 0,             "requests": [               {                 "id": 123,                 "status": 0,                 "media": "string",                 "createdAt": "2020-09-12T10:00:27.000Z",                 "updatedAt": "2020-09-12T10:00:27.000Z",                 "requestedBy": {                   "id": 1,                   "email": "hey@itsme.com",                   "username": "string",                   "plexToken": "string",                   "plexUsername": "string",                   "userType": 1,                   "permissions": 0,                   "avatar": "string",                   "createdAt": "2020-09-02T05:02:23.000Z",                   "updatedAt": "2020-09-02T05:02:23.000Z",                   "requestCount": 5                 },                 "modifiedBy": {                   "id": 1,                   "email": "hey@itsme.com",                   "username": "string",                   "plexToken": "string",                   "plexUsername": "string",                   "userType": 1,                   "permissions": 0,                   "avatar": "string",                   "createdAt": "2020-09-02T05:02:23.000Z",                   "updatedAt": "2020-09-02T05:02:23.000Z",                   "requestCount": 5                 },                 "is4k": false,                 "serverId": 0,                 "profileId": 0,                 "rootFolder": "string"               }             ],             "createdAt": "2020-09-12T10:00:27.000Z",             "updatedAt": "2020-09-12T10:00:27.000Z"           }         }       ]     }   ] } ``` | *No links* |

Returns a list of TMDB keywords matching the search query

| Name | Description |
| --- | --- |
| query   \*  string  (  query  ) |  |
| page  number  (  query  ) | *Default value* : 1 |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Results  Media type  Controls `Accept` header.  ```json {   "page": 1,   "totalPages": 20,   "totalResults": 200,   "results": [     {       "id": 1,       "name": "anime"     }   ] } ``` | *No links* |

Returns a list of TMDB companies matching the search query. (Will not return origin country)

| Name | Description |
| --- | --- |
| query   \*  string  (  query  ) |  |
| page  number  (  query  ) | *Default value* : 1 |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Results  Media type  Controls `Accept` header.  ```json {   "page": 1,   "totalPages": 20,   "totalResults": 200,   "results": [     {       "id": 1,       "logo_path": "string",       "name": "string"     }   ] } ``` | *No links* |

Returns a list of movies in a JSON object.

| Name | Description |
| --- | --- |
| page  number  (  query  ) | *Default value* : 1 |
| language  string  (  query  ) |  |
| genre  string  (  query  ) |  |
| studio  number  (  query  ) |  |
| keywords  string  (  query  ) |  |
| sortBy  string  (  query  ) |  |
| primaryReleaseDateGte  string  (  query  ) |  |
| primaryReleaseDateLte  string  (  query  ) |  |
| withRuntimeGte  number  (  query  ) |  |
| withRuntimeLte  number  (  query  ) |  |
| voteAverageGte  number  (  query  ) |  |
| voteAverageLte  number  (  query  ) |  |
| voteCountGte  number  (  query  ) |  |
| voteCountLte  number  (  query  ) |  |
| watchRegion  string  (  query  ) |  |
| watchProviders  string  (  query  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Results  Media type  Controls `Accept` header.  ```json {   "page": 1,   "totalPages": 20,   "totalResults": 200,   "results": [     {       "id": 1234,       "mediaType": "string",       "popularity": 10,       "posterPath": "string",       "backdropPath": "string",       "voteCount": 0,       "voteAverage": 0,       "genreIds": [         0       ],       "overview": "Overview of the movie",       "originalLanguage": "en",       "title": "Movie Title",       "originalTitle": "Original Movie Title",       "releaseDate": "string",       "adult": false,       "video": false,       "mediaInfo": {         "id": 0,         "tmdbId": 0,         "tvdbId": 0,         "status": 0,         "requests": [           {             "id": 123,             "status": 0,             "media": "string",             "createdAt": "2020-09-12T10:00:27.000Z",             "updatedAt": "2020-09-12T10:00:27.000Z",             "requestedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "modifiedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "is4k": false,             "serverId": 0,             "profileId": 0,             "rootFolder": "string"           }         ],         "createdAt": "2020-09-12T10:00:27.000Z",         "updatedAt": "2020-09-12T10:00:27.000Z"       }     }   ] } ``` | *No links* |

Returns a list of movies based on the provided genre ID in a JSON object.

| Name | Description |
| --- | --- |
| genreId   \*  string  (  path  ) |  |
| page  number  (  query  ) | *Default value* : 1 |
| language  string  (  query  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Results  Media type  Controls `Accept` header.  ```json {   "page": 1,   "totalPages": 20,   "totalResults": 200,   "genre": {     "id": 1,     "name": "Adventure"   },   "results": [     {       "id": 1234,       "mediaType": "string",       "popularity": 10,       "posterPath": "string",       "backdropPath": "string",       "voteCount": 0,       "voteAverage": 0,       "genreIds": [         0       ],       "overview": "Overview of the movie",       "originalLanguage": "en",       "title": "Movie Title",       "originalTitle": "Original Movie Title",       "releaseDate": "string",       "adult": false,       "video": false,       "mediaInfo": {         "id": 0,         "tmdbId": 0,         "tvdbId": 0,         "status": 0,         "requests": [           {             "id": 123,             "status": 0,             "media": "string",             "createdAt": "2020-09-12T10:00:27.000Z",             "updatedAt": "2020-09-12T10:00:27.000Z",             "requestedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "modifiedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "is4k": false,             "serverId": 0,             "profileId": 0,             "rootFolder": "string"           }         ],         "createdAt": "2020-09-12T10:00:27.000Z",         "updatedAt": "2020-09-12T10:00:27.000Z"       }     }   ] } ``` | *No links* |

Returns a list of movies based on the provided ISO 639-1 language code in a JSON object.

| Name | Description |
| --- | --- |
| language   \*  string  (  path  ) |  |
| page  number  (  query  ) | *Default value* : 1 |
| language  string  (  query  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Results  Media type  Controls `Accept` header.  ```json {   "page": 1,   "totalPages": 20,   "totalResults": 200,   "language": {     "englishName": "English",     "iso_639_1": "en",     "name": "English"   },   "results": [     {       "id": 1234,       "mediaType": "string",       "popularity": 10,       "posterPath": "string",       "backdropPath": "string",       "voteCount": 0,       "voteAverage": 0,       "genreIds": [         0       ],       "overview": "Overview of the movie",       "originalLanguage": "en",       "title": "Movie Title",       "originalTitle": "Original Movie Title",       "releaseDate": "string",       "adult": false,       "video": false,       "mediaInfo": {         "id": 0,         "tmdbId": 0,         "tvdbId": 0,         "status": 0,         "requests": [           {             "id": 123,             "status": 0,             "media": "string",             "createdAt": "2020-09-12T10:00:27.000Z",             "updatedAt": "2020-09-12T10:00:27.000Z",             "requestedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "modifiedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "is4k": false,             "serverId": 0,             "profileId": 0,             "rootFolder": "string"           }         ],         "createdAt": "2020-09-12T10:00:27.000Z",         "updatedAt": "2020-09-12T10:00:27.000Z"       }     }   ] } ``` | *No links* |

Returns a list of movies based on the provided studio ID in a JSON object.

| Name | Description |
| --- | --- |
| studioId   \*  string  (  path  ) |  |
| page  number  (  query  ) | *Default value* : 1 |
| language  string  (  query  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Results  Media type  Controls `Accept` header.  ```json {   "page": 1,   "totalPages": 20,   "totalResults": 200,   "studio": {     "id": 1,     "logoPath": "string",     "originCountry": "string",     "name": "string"   },   "results": [     {       "id": 1234,       "mediaType": "string",       "popularity": 10,       "posterPath": "string",       "backdropPath": "string",       "voteCount": 0,       "voteAverage": 0,       "genreIds": [         0       ],       "overview": "Overview of the movie",       "originalLanguage": "en",       "title": "Movie Title",       "originalTitle": "Original Movie Title",       "releaseDate": "string",       "adult": false,       "video": false,       "mediaInfo": {         "id": 0,         "tmdbId": 0,         "tvdbId": 0,         "status": 0,         "requests": [           {             "id": 123,             "status": 0,             "media": "string",             "createdAt": "2020-09-12T10:00:27.000Z",             "updatedAt": "2020-09-12T10:00:27.000Z",             "requestedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "modifiedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "is4k": false,             "serverId": 0,             "profileId": 0,             "rootFolder": "string"           }         ],         "createdAt": "2020-09-12T10:00:27.000Z",         "updatedAt": "2020-09-12T10:00:27.000Z"       }     }   ] } ``` | *No links* |

Returns a list of movies in a JSON object.

| Name | Description |
| --- | --- |
| page  number  (  query  ) | *Default value* : 1 |
| language  string  (  query  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Results  Media type  Controls `Accept` header.  ```json {   "page": 1,   "totalPages": 20,   "totalResults": 200,   "results": [     {       "id": 1234,       "mediaType": "string",       "popularity": 10,       "posterPath": "string",       "backdropPath": "string",       "voteCount": 0,       "voteAverage": 0,       "genreIds": [         0       ],       "overview": "Overview of the movie",       "originalLanguage": "en",       "title": "Movie Title",       "originalTitle": "Original Movie Title",       "releaseDate": "string",       "adult": false,       "video": false,       "mediaInfo": {         "id": 0,         "tmdbId": 0,         "tvdbId": 0,         "status": 0,         "requests": [           {             "id": 123,             "status": 0,             "media": "string",             "createdAt": "2020-09-12T10:00:27.000Z",             "updatedAt": "2020-09-12T10:00:27.000Z",             "requestedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "modifiedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "is4k": false,             "serverId": 0,             "profileId": 0,             "rootFolder": "string"           }         ],         "createdAt": "2020-09-12T10:00:27.000Z",         "updatedAt": "2020-09-12T10:00:27.000Z"       }     }   ] } ``` | *No links* |

Returns a list of TV shows in a JSON object.

| Name | Description |
| --- | --- |
| page  number  (  query  ) | *Default value* : 1 |
| language  string  (  query  ) |  |
| genre  string  (  query  ) |  |
| network  number  (  query  ) |  |
| keywords  string  (  query  ) |  |
| sortBy  string  (  query  ) |  |
| firstAirDateGte  string  (  query  ) |  |
| firstAirDateLte  string  (  query  ) |  |
| withRuntimeGte  number  (  query  ) |  |
| withRuntimeLte  number  (  query  ) |  |
| voteAverageGte  number  (  query  ) |  |
| voteAverageLte  number  (  query  ) |  |
| voteCountGte  number  (  query  ) |  |
| voteCountLte  number  (  query  ) |  |
| watchRegion  string  (  query  ) |  |
| watchProviders  string  (  query  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Results  Media type  Controls `Accept` header.  ```json {   "page": 1,   "totalPages": 20,   "totalResults": 200,   "results": [     {       "id": 1234,       "mediaType": "string",       "popularity": 10,       "posterPath": "string",       "backdropPath": "string",       "voteCount": 0,       "voteAverage": 0,       "genreIds": [         0       ],       "overview": "Overview of the movie",       "originalLanguage": "en",       "name": "TV Show Name",       "originalName": "Original TV Show Name",       "originCountry": [         "string"       ],       "firstAirDate": "string",       "mediaInfo": {         "id": 0,         "tmdbId": 0,         "tvdbId": 0,         "status": 0,         "requests": [           {             "id": 123,             "status": 0,             "media": "string",             "createdAt": "2020-09-12T10:00:27.000Z",             "updatedAt": "2020-09-12T10:00:27.000Z",             "requestedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "modifiedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "is4k": false,             "serverId": 0,             "profileId": 0,             "rootFolder": "string"           }         ],         "createdAt": "2020-09-12T10:00:27.000Z",         "updatedAt": "2020-09-12T10:00:27.000Z"       }     }   ] } ``` | *No links* |

Returns a list of TV shows based on the provided ISO 639-1 language code in a JSON object.

| Name | Description |
| --- | --- |
| language   \*  string  (  path  ) |  |
| page  number  (  query  ) | *Default value* : 1 |
| language  string  (  query  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Results  Media type  Controls `Accept` header.  ```json {   "page": 1,   "totalPages": 20,   "totalResults": 200,   "language": {     "englishName": "English",     "iso_639_1": "en",     "name": "English"   },   "results": [     {       "id": 1234,       "mediaType": "string",       "popularity": 10,       "posterPath": "string",       "backdropPath": "string",       "voteCount": 0,       "voteAverage": 0,       "genreIds": [         0       ],       "overview": "Overview of the movie",       "originalLanguage": "en",       "name": "TV Show Name",       "originalName": "Original TV Show Name",       "originCountry": [         "string"       ],       "firstAirDate": "string",       "mediaInfo": {         "id": 0,         "tmdbId": 0,         "tvdbId": 0,         "status": 0,         "requests": [           {             "id": 123,             "status": 0,             "media": "string",             "createdAt": "2020-09-12T10:00:27.000Z",             "updatedAt": "2020-09-12T10:00:27.000Z",             "requestedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "modifiedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "is4k": false,             "serverId": 0,             "profileId": 0,             "rootFolder": "string"           }         ],         "createdAt": "2020-09-12T10:00:27.000Z",         "updatedAt": "2020-09-12T10:00:27.000Z"       }     }   ] } ``` | *No links* |

Returns a list of TV shows based on the provided genre ID in a JSON object.

| Name | Description |
| --- | --- |
| genreId   \*  string  (  path  ) |  |
| page  number  (  query  ) | *Default value* : 1 |
| language  string  (  query  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Results  Media type  Controls `Accept` header.  ```json {   "page": 1,   "totalPages": 20,   "totalResults": 200,   "genre": {     "id": 1,     "name": "Adventure"   },   "results": [     {       "id": 1234,       "mediaType": "string",       "popularity": 10,       "posterPath": "string",       "backdropPath": "string",       "voteCount": 0,       "voteAverage": 0,       "genreIds": [         0       ],       "overview": "Overview of the movie",       "originalLanguage": "en",       "name": "TV Show Name",       "originalName": "Original TV Show Name",       "originCountry": [         "string"       ],       "firstAirDate": "string",       "mediaInfo": {         "id": 0,         "tmdbId": 0,         "tvdbId": 0,         "status": 0,         "requests": [           {             "id": 123,             "status": 0,             "media": "string",             "createdAt": "2020-09-12T10:00:27.000Z",             "updatedAt": "2020-09-12T10:00:27.000Z",             "requestedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "modifiedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "is4k": false,             "serverId": 0,             "profileId": 0,             "rootFolder": "string"           }         ],         "createdAt": "2020-09-12T10:00:27.000Z",         "updatedAt": "2020-09-12T10:00:27.000Z"       }     }   ] } ``` | *No links* |

Returns a list of TV shows based on the provided network ID in a JSON object.

| Name | Description |
| --- | --- |
| networkId   \*  string  (  path  ) |  |
| page  number  (  query  ) | *Default value* : 1 |
| language  string  (  query  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Results  Media type  Controls `Accept` header.  ```json {   "page": 1,   "totalPages": 20,   "totalResults": 200,   "network": {     "id": 1,     "logoPath": "string",     "originCountry": "string",     "name": "string"   },   "results": [     {       "id": 1234,       "mediaType": "string",       "popularity": 10,       "posterPath": "string",       "backdropPath": "string",       "voteCount": 0,       "voteAverage": 0,       "genreIds": [         0       ],       "overview": "Overview of the movie",       "originalLanguage": "en",       "name": "TV Show Name",       "originalName": "Original TV Show Name",       "originCountry": [         "string"       ],       "firstAirDate": "string",       "mediaInfo": {         "id": 0,         "tmdbId": 0,         "tvdbId": 0,         "status": 0,         "requests": [           {             "id": 123,             "status": 0,             "media": "string",             "createdAt": "2020-09-12T10:00:27.000Z",             "updatedAt": "2020-09-12T10:00:27.000Z",             "requestedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "modifiedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "is4k": false,             "serverId": 0,             "profileId": 0,             "rootFolder": "string"           }         ],         "createdAt": "2020-09-12T10:00:27.000Z",         "updatedAt": "2020-09-12T10:00:27.000Z"       }     }   ] } ``` | *No links* |

Returns a list of upcoming TV shows in a JSON object.

| Name | Description |
| --- | --- |
| page  number  (  query  ) | *Default value* : 1 |
| language  string  (  query  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Results  Media type  Controls `Accept` header.  ```json {   "page": 1,   "totalPages": 20,   "totalResults": 200,   "results": [     {       "id": 1234,       "mediaType": "string",       "popularity": 10,       "posterPath": "string",       "backdropPath": "string",       "voteCount": 0,       "voteAverage": 0,       "genreIds": [         0       ],       "overview": "Overview of the movie",       "originalLanguage": "en",       "name": "TV Show Name",       "originalName": "Original TV Show Name",       "originCountry": [         "string"       ],       "firstAirDate": "string",       "mediaInfo": {         "id": 0,         "tmdbId": 0,         "tvdbId": 0,         "status": 0,         "requests": [           {             "id": 123,             "status": 0,             "media": "string",             "createdAt": "2020-09-12T10:00:27.000Z",             "updatedAt": "2020-09-12T10:00:27.000Z",             "requestedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "modifiedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "is4k": false,             "serverId": 0,             "profileId": 0,             "rootFolder": "string"           }         ],         "createdAt": "2020-09-12T10:00:27.000Z",         "updatedAt": "2020-09-12T10:00:27.000Z"       }     }   ] } ``` | *No links* |

Returns a list of movies and TV shows in a JSON object.

| Name | Description |
| --- | --- |
| page  number  (  query  ) | *Default value* : 1 |
| language  string  (  query  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Results  Media type  Controls `Accept` header.  ```json {   "page": 1,   "totalPages": 20,   "totalResults": 200,   "results": [     {       "id": 1234,       "mediaType": "string",       "popularity": 10,       "posterPath": "string",       "backdropPath": "string",       "voteCount": 0,       "voteAverage": 0,       "genreIds": [         0       ],       "overview": "Overview of the movie",       "originalLanguage": "en",       "title": "Movie Title",       "originalTitle": "Original Movie Title",       "releaseDate": "string",       "adult": false,       "video": false,       "mediaInfo": {         "id": 0,         "tmdbId": 0,         "tvdbId": 0,         "status": 0,         "requests": [           {             "id": 123,             "status": 0,             "media": "string",             "createdAt": "2020-09-12T10:00:27.000Z",             "updatedAt": "2020-09-12T10:00:27.000Z",             "requestedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "modifiedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "is4k": false,             "serverId": 0,             "profileId": 0,             "rootFolder": "string"           }         ],         "createdAt": "2020-09-12T10:00:27.000Z",         "updatedAt": "2020-09-12T10:00:27.000Z"       }     },     {       "id": 1234,       "mediaType": "string",       "popularity": 10,       "posterPath": "string",       "backdropPath": "string",       "voteCount": 0,       "voteAverage": 0,       "genreIds": [         0       ],       "overview": "Overview of the movie",       "originalLanguage": "en",       "name": "TV Show Name",       "originalName": "Original TV Show Name",       "originCountry": [         "string"       ],       "firstAirDate": "string",       "mediaInfo": {         "id": 0,         "tmdbId": 0,         "tvdbId": 0,         "status": 0,         "requests": [           {             "id": 123,             "status": 0,             "media": "string",             "createdAt": "2020-09-12T10:00:27.000Z",             "updatedAt": "2020-09-12T10:00:27.000Z",             "requestedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "modifiedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "is4k": false,             "serverId": 0,             "profileId": 0,             "rootFolder": "string"           }         ],         "createdAt": "2020-09-12T10:00:27.000Z",         "updatedAt": "2020-09-12T10:00:27.000Z"       }     },     {       "id": 12345,       "profilePath": "string",       "adult": false,       "mediaType": "person",       "knownFor": [         {           "id": 1234,           "mediaType": "string",           "popularity": 10,           "posterPath": "string",           "backdropPath": "string",           "voteCount": 0,           "voteAverage": 0,           "genreIds": [             0           ],           "overview": "Overview of the movie",           "originalLanguage": "en",           "title": "Movie Title",           "originalTitle": "Original Movie Title",           "releaseDate": "string",           "adult": false,           "video": false,           "mediaInfo": {             "id": 0,             "tmdbId": 0,             "tvdbId": 0,             "status": 0,             "requests": [               {                 "id": 123,                 "status": 0,                 "media": "string",                 "createdAt": "2020-09-12T10:00:27.000Z",                 "updatedAt": "2020-09-12T10:00:27.000Z",                 "requestedBy": {                   "id": 1,                   "email": "hey@itsme.com",                   "username": "string",                   "plexToken": "string",                   "plexUsername": "string",                   "userType": 1,                   "permissions": 0,                   "avatar": "string",                   "createdAt": "2020-09-02T05:02:23.000Z",                   "updatedAt": "2020-09-02T05:02:23.000Z",                   "requestCount": 5                 },                 "modifiedBy": {                   "id": 1,                   "email": "hey@itsme.com",                   "username": "string",                   "plexToken": "string",                   "plexUsername": "string",                   "userType": 1,                   "permissions": 0,                   "avatar": "string",                   "createdAt": "2020-09-02T05:02:23.000Z",                   "updatedAt": "2020-09-02T05:02:23.000Z",                   "requestCount": 5                 },                 "is4k": false,                 "serverId": 0,                 "profileId": 0,                 "rootFolder": "string"               }             ],             "createdAt": "2020-09-12T10:00:27.000Z",             "updatedAt": "2020-09-12T10:00:27.000Z"           }         },         {           "id": 1234,           "mediaType": "string",           "popularity": 10,           "posterPath": "string",           "backdropPath": "string",           "voteCount": 0,           "voteAverage": 0,           "genreIds": [             0           ],           "overview": "Overview of the movie",           "originalLanguage": "en",           "name": "TV Show Name",           "originalName": "Original TV Show Name",           "originCountry": [             "string"           ],           "firstAirDate": "string",           "mediaInfo": {             "id": 0,             "tmdbId": 0,             "tvdbId": 0,             "status": 0,             "requests": [               {                 "id": 123,                 "status": 0,                 "media": "string",                 "createdAt": "2020-09-12T10:00:27.000Z",                 "updatedAt": "2020-09-12T10:00:27.000Z",                 "requestedBy": {                   "id": 1,                   "email": "hey@itsme.com",                   "username": "string",                   "plexToken": "string",                   "plexUsername": "string",                   "userType": 1,                   "permissions": 0,                   "avatar": "string",                   "createdAt": "2020-09-02T05:02:23.000Z",                   "updatedAt": "2020-09-02T05:02:23.000Z",                   "requestCount": 5                 },                 "modifiedBy": {                   "id": 1,                   "email": "hey@itsme.com",                   "username": "string",                   "plexToken": "string",                   "plexUsername": "string",                   "userType": 1,                   "permissions": 0,                   "avatar": "string",                   "createdAt": "2020-09-02T05:02:23.000Z",                   "updatedAt": "2020-09-02T05:02:23.000Z",                   "requestCount": 5                 },                 "is4k": false,                 "serverId": 0,                 "profileId": 0,                 "rootFolder": "string"               }             ],             "createdAt": "2020-09-12T10:00:27.000Z",             "updatedAt": "2020-09-12T10:00:27.000Z"           }         }       ]     }   ] } ``` | *No links* |

Returns list of movies based on the provided keyword ID a JSON object.

| Name | Description |
| --- | --- |
| keywordId   \*  number  (  path  ) |  |
| page  number  (  query  ) | *Default value* : 1 |
| language  string  (  query  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | List of movies  Media type  Controls `Accept` header.  ```json {   "page": 1,   "totalPages": 20,   "totalResults": 200,   "results": [     {       "id": 1234,       "mediaType": "string",       "popularity": 10,       "posterPath": "string",       "backdropPath": "string",       "voteCount": 0,       "voteAverage": 0,       "genreIds": [         0       ],       "overview": "Overview of the movie",       "originalLanguage": "en",       "title": "Movie Title",       "originalTitle": "Original Movie Title",       "releaseDate": "string",       "adult": false,       "video": false,       "mediaInfo": {         "id": 0,         "tmdbId": 0,         "tvdbId": 0,         "status": 0,         "requests": [           {             "id": 123,             "status": 0,             "media": "string",             "createdAt": "2020-09-12T10:00:27.000Z",             "updatedAt": "2020-09-12T10:00:27.000Z",             "requestedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "modifiedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "is4k": false,             "serverId": 0,             "profileId": 0,             "rootFolder": "string"           }         ],         "createdAt": "2020-09-12T10:00:27.000Z",         "updatedAt": "2020-09-12T10:00:27.000Z"       }     }   ] } ``` | *No links* |

Returns a list of genres with backdrops attached

| Name | Description |
| --- | --- |
| language  string  (  query  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Genre slider data returned  Media type  Controls `Accept` header.  ```json [   {     "id": 1,     "backdrops": [       "string"     ],     "name": "Genre Name"   } ] ``` | *No links* |

Returns a list of genres with backdrops attached

| Name | Description |
| --- | --- |
| language  string  (  query  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Genre slider data returned  Media type  Controls `Accept` header.  ```json [   {     "id": 1,     "backdrops": [       "string"     ],     "name": "Genre Name"   } ] ``` | *No links* |

| Name | Description |
| --- | --- |
| page  number  (  query  ) | *Default value* : 1 |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Watchlist data returned  Media type  Controls `Accept` header.  ```json {   "page": 0,   "totalPages": 0,   "totalResults": 0,   "results": [     {       "tmdbId": 1,       "ratingKey": "string",       "type": "string",       "title": "string"     }   ] } ``` | *No links* |

### [request](https://api-docs.overseerr.dev/#/request)

Endpoints related to request management.

Returns all requests if the user has the `ADMIN` or `MANAGE_REQUESTS` permissions. Otherwise, only the logged-in user's requests are returned.

If the `requestedBy` parameter is specified, only requests from that particular user ID will be returned.

| Name | Description |
| --- | --- |
| take  number  (  query  ) |  |
| skip  number  (  query  ) |  |
| filter  string  (  query  ) | *Available values* : all, approved, available, pending, processing, unavailable, failed |
| sort  string  (  query  ) | *Available values* : added, modified  *Default value* : added |
| requestedBy  number  (  query  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Requests returned  Media type  Controls `Accept` header.  ```json {   "pageInfo": {     "page": 1,     "pages": 10,     "results": 100   },   "results": [     {       "id": 123,       "status": 0,       "media": {         "id": 0,         "tmdbId": 0,         "tvdbId": 0,         "status": 0,         "requests": [           "string"         ],         "createdAt": "2020-09-12T10:00:27.000Z",         "updatedAt": "2020-09-12T10:00:27.000Z"       },       "createdAt": "2020-09-12T10:00:27.000Z",       "updatedAt": "2020-09-12T10:00:27.000Z",       "requestedBy": {         "id": 1,         "email": "hey@itsme.com",         "username": "string",         "plexToken": "string",         "plexUsername": "string",         "userType": 1,         "permissions": 0,         "avatar": "string",         "createdAt": "2020-09-02T05:02:23.000Z",         "updatedAt": "2020-09-02T05:02:23.000Z",         "requestCount": 5       },       "modifiedBy": {         "id": 1,         "email": "hey@itsme.com",         "username": "string",         "plexToken": "string",         "plexUsername": "string",         "userType": 1,         "permissions": 0,         "avatar": "string",         "createdAt": "2020-09-02T05:02:23.000Z",         "updatedAt": "2020-09-02T05:02:23.000Z",         "requestCount": 5       },       "is4k": false,       "serverId": 0,       "profileId": 0,       "rootFolder": "string"     }   ] } ``` | *No links* |

Creates a new request with the provided media ID and type. The `REQUEST` permission is required.

If the user has the `ADMIN` or `AUTO_APPROVE` permissions, their request will be auomatically approved.

```json
{
  "mediaType": "movie",
  "mediaId": 123,
  "tvdbId": 123,
  "seasons": [
    1
  ],
  "is4k": false,
  "serverId": 0,
  "profileId": 0,
  "rootFolder": "string",
  "languageProfileId": 0,
  "userId": 0
}
```

| Code | Description | Links |
| --- | --- | --- |
| 201 | Succesfully created the request  Media type  Controls `Accept` header.  ```json {   "id": 123,   "status": 0,   "media": {     "id": 0,     "tmdbId": 0,     "tvdbId": 0,     "status": 0,     "requests": [       "string"     ],     "createdAt": "2020-09-12T10:00:27.000Z",     "updatedAt": "2020-09-12T10:00:27.000Z"   },   "createdAt": "2020-09-12T10:00:27.000Z",   "updatedAt": "2020-09-12T10:00:27.000Z",   "requestedBy": {     "id": 1,     "email": "hey@itsme.com",     "username": "string",     "plexToken": "string",     "plexUsername": "string",     "userType": 1,     "permissions": 0,     "avatar": "string",     "createdAt": "2020-09-02T05:02:23.000Z",     "updatedAt": "2020-09-02T05:02:23.000Z",     "requestCount": 5   },   "modifiedBy": {     "id": 1,     "email": "hey@itsme.com",     "username": "string",     "plexToken": "string",     "plexUsername": "string",     "userType": 1,     "permissions": 0,     "avatar": "string",     "createdAt": "2020-09-02T05:02:23.000Z",     "updatedAt": "2020-09-02T05:02:23.000Z",     "requestCount": 5   },   "is4k": false,   "serverId": 0,   "profileId": 0,   "rootFolder": "string" } ``` | *No links* |

Returns the number of pending and approved requests.

| Code | Description | Links |
| --- | --- | --- |
| 200 | Request counts returned  Media type  Controls `Accept` header.  ```json {   "total": 0,   "movie": 0,   "tv": 0,   "pending": 0,   "approved": 0,   "declined": 0,   "processing": 0,   "available": 0 } ``` | *No links* |

Returns a specific MediaRequest in a JSON object.

| Name | Description |
| --- | --- |
| requestId   \*  string  (  path  ) | Request ID  *Example* : 1 |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Succesfully returns request  Media type  Controls `Accept` header.  ```json {   "id": 123,   "status": 0,   "media": {     "id": 0,     "tmdbId": 0,     "tvdbId": 0,     "status": 0,     "requests": [       "string"     ],     "createdAt": "2020-09-12T10:00:27.000Z",     "updatedAt": "2020-09-12T10:00:27.000Z"   },   "createdAt": "2020-09-12T10:00:27.000Z",   "updatedAt": "2020-09-12T10:00:27.000Z",   "requestedBy": {     "id": 1,     "email": "hey@itsme.com",     "username": "string",     "plexToken": "string",     "plexUsername": "string",     "userType": 1,     "permissions": 0,     "avatar": "string",     "createdAt": "2020-09-02T05:02:23.000Z",     "updatedAt": "2020-09-02T05:02:23.000Z",     "requestCount": 5   },   "modifiedBy": {     "id": 1,     "email": "hey@itsme.com",     "username": "string",     "plexToken": "string",     "plexUsername": "string",     "userType": 1,     "permissions": 0,     "avatar": "string",     "createdAt": "2020-09-02T05:02:23.000Z",     "updatedAt": "2020-09-02T05:02:23.000Z",     "requestCount": 5   },   "is4k": false,   "serverId": 0,   "profileId": 0,   "rootFolder": "string" } ``` | *No links* |

Updates a specific media request and returns the request in a JSON object. Requires the `MANAGE_REQUESTS` permission.

| Name | Description |
| --- | --- |
| requestId   \*  string  (  path  ) | Request ID  *Example* : 1 |

```json
{
  "mediaType": "movie",
  "seasons": [
    1
  ],
  "is4k": false,
  "serverId": 0,
  "profileId": 0,
  "rootFolder": "string",
  "languageProfileId": 0,
  "userId": 0
}
```

| Code | Description | Links |
| --- | --- | --- |
| 200 | Succesfully updated request  Media type  Controls `Accept` header.  ```json {   "id": 123,   "status": 0,   "media": {     "id": 0,     "tmdbId": 0,     "tvdbId": 0,     "status": 0,     "requests": [       "string"     ],     "createdAt": "2020-09-12T10:00:27.000Z",     "updatedAt": "2020-09-12T10:00:27.000Z"   },   "createdAt": "2020-09-12T10:00:27.000Z",   "updatedAt": "2020-09-12T10:00:27.000Z",   "requestedBy": {     "id": 1,     "email": "hey@itsme.com",     "username": "string",     "plexToken": "string",     "plexUsername": "string",     "userType": 1,     "permissions": 0,     "avatar": "string",     "createdAt": "2020-09-02T05:02:23.000Z",     "updatedAt": "2020-09-02T05:02:23.000Z",     "requestCount": 5   },   "modifiedBy": {     "id": 1,     "email": "hey@itsme.com",     "username": "string",     "plexToken": "string",     "plexUsername": "string",     "userType": 1,     "permissions": 0,     "avatar": "string",     "createdAt": "2020-09-02T05:02:23.000Z",     "updatedAt": "2020-09-02T05:02:23.000Z",     "requestCount": 5   },   "is4k": false,   "serverId": 0,   "profileId": 0,   "rootFolder": "string" } ``` | *No links* |

Removes a request. If the user has the `MANAGE_REQUESTS` permission, any request can be removed. Otherwise, only pending requests can be removed.

| Name | Description |
| --- | --- |
| requestId   \*  string  (  path  ) | Request ID  *Example* : 1 |

| Code | Description | Links |
| --- | --- | --- |
| 204 | Succesfully removed request | *No links* |

Retries a request by resending requests to Sonarr or Radarr.

Requires the `MANAGE_REQUESTS` permission or `ADMIN`.

| Name | Description |
| --- | --- |
| requestId   \*  string  (  path  ) | Request ID |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Retry triggered  Media type  Controls `Accept` header.  ```json {   "id": 123,   "status": 0,   "media": {     "id": 0,     "tmdbId": 0,     "tvdbId": 0,     "status": 0,     "requests": [       "string"     ],     "createdAt": "2020-09-12T10:00:27.000Z",     "updatedAt": "2020-09-12T10:00:27.000Z"   },   "createdAt": "2020-09-12T10:00:27.000Z",   "updatedAt": "2020-09-12T10:00:27.000Z",   "requestedBy": {     "id": 1,     "email": "hey@itsme.com",     "username": "string",     "plexToken": "string",     "plexUsername": "string",     "userType": 1,     "permissions": 0,     "avatar": "string",     "createdAt": "2020-09-02T05:02:23.000Z",     "updatedAt": "2020-09-02T05:02:23.000Z",     "requestCount": 5   },   "modifiedBy": {     "id": 1,     "email": "hey@itsme.com",     "username": "string",     "plexToken": "string",     "plexUsername": "string",     "userType": 1,     "permissions": 0,     "avatar": "string",     "createdAt": "2020-09-02T05:02:23.000Z",     "updatedAt": "2020-09-02T05:02:23.000Z",     "requestCount": 5   },   "is4k": false,   "serverId": 0,   "profileId": 0,   "rootFolder": "string" } ``` | *No links* |

Updates a request's status to approved or declined. Also returns the request in a JSON object.

Requires the `MANAGE_REQUESTS` permission or `ADMIN`.

| Name | Description |
| --- | --- |
| requestId   \*  string  (  path  ) | Request ID |
| status   \*  string  (  path  ) | New status  *Available values* : approve, decline |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Request status changed  Media type  Controls `Accept` header.  ```json {   "id": 123,   "status": 0,   "media": {     "id": 0,     "tmdbId": 0,     "tvdbId": 0,     "status": 0,     "requests": [       "string"     ],     "createdAt": "2020-09-12T10:00:27.000Z",     "updatedAt": "2020-09-12T10:00:27.000Z"   },   "createdAt": "2020-09-12T10:00:27.000Z",   "updatedAt": "2020-09-12T10:00:27.000Z",   "requestedBy": {     "id": 1,     "email": "hey@itsme.com",     "username": "string",     "plexToken": "string",     "plexUsername": "string",     "userType": 1,     "permissions": 0,     "avatar": "string",     "createdAt": "2020-09-02T05:02:23.000Z",     "updatedAt": "2020-09-02T05:02:23.000Z",     "requestCount": 5   },   "modifiedBy": {     "id": 1,     "email": "hey@itsme.com",     "username": "string",     "plexToken": "string",     "plexUsername": "string",     "userType": 1,     "permissions": 0,     "avatar": "string",     "createdAt": "2020-09-02T05:02:23.000Z",     "updatedAt": "2020-09-02T05:02:23.000Z",     "requestCount": 5   },   "is4k": false,   "serverId": 0,   "profileId": 0,   "rootFolder": "string" } ``` | *No links* |

### [movies](https://api-docs.overseerr.dev/#/movies)

Endpoints related to retrieving movies and their details.

Returns full movie details in a JSON object.

| Name | Description |
| --- | --- |
| movieId   \*  number  (  path  ) |  |
| language  string  (  query  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Movie details  Media type  Controls `Accept` header.  ```json {   "id": 123,   "imdbId": "tt123",   "adult": true,   "backdropPath": "string",   "posterPath": "string",   "budget": 1000000,   "genres": [     {       "id": 1,       "name": "Adventure"     }   ],   "homepage": "string",   "relatedVideos": [     {       "url": "https://www.youtube.com/watch?v=9qhL2_UxXM0/",       "key": "9qhL2_UxXM0",       "name": "Trailer for some movie (1978)",       "size": 1080,       "type": "Trailer",       "site": "YouTube"     }   ],   "originalLanguage": "string",   "originalTitle": "string",   "overview": "string",   "popularity": 0,   "productionCompanies": [     {       "id": 1,       "logoPath": "string",       "originCountry": "string",       "name": "string"     }   ],   "productionCountries": [     {       "iso_3166_1": "string",       "name": "string"     }   ],   "releaseDate": "string",   "releases": {     "results": [       {         "iso_3166_1": "US",         "rating": "string",         "release_dates": [           {             "certification": "PG-13",             "iso_639_1": "string",             "note": "Blu ray",             "release_date": "2017-07-12T00:00:00.000Z",             "type": 1           }         ]       }     ]   },   "revenue": 0,   "runtime": 0,   "spokenLanguages": [     {       "englishName": "English",       "iso_639_1": "en",       "name": "English"     }   ],   "status": "string",   "tagline": "string",   "title": "string",   "video": true,   "voteAverage": 0,   "voteCount": 0,   "credits": {     "cast": [       {         "id": 123,         "castId": 1,         "character": "Some Character Name",         "creditId": "string",         "gender": 0,         "name": "Some Persons Name",         "order": 0,         "profilePath": "string"       }     ],     "crew": [       {         "id": 123,         "creditId": "string",         "gender": 0,         "name": "Some Persons Name",         "job": "string",         "department": "string",         "profilePath": "string"       }     ]   },   "collection": {     "id": 1,     "name": "A collection",     "posterPath": "string",     "backdropPath": "string"   },   "externalIds": {     "facebookId": "string",     "freebaseId": "string",     "freebaseMid": "string",     "imdbId": "string",     "instagramId": "string",     "tvdbId": 0,     "tvrageId": 0,     "twitterId": "string"   },   "mediaInfo": {     "id": 0,     "tmdbId": 0,     "tvdbId": 0,     "status": 0,     "requests": [       {         "id": 123,         "status": 0,         "media": "string",         "createdAt": "2020-09-12T10:00:27.000Z",         "updatedAt": "2020-09-12T10:00:27.000Z",         "requestedBy": {           "id": 1,           "email": "hey@itsme.com",           "username": "string",           "plexToken": "string",           "plexUsername": "string",           "userType": 1,           "permissions": 0,           "avatar": "string",           "createdAt": "2020-09-02T05:02:23.000Z",           "updatedAt": "2020-09-02T05:02:23.000Z",           "requestCount": 5         },         "modifiedBy": {           "id": 1,           "email": "hey@itsme.com",           "username": "string",           "plexToken": "string",           "plexUsername": "string",           "userType": 1,           "permissions": 0,           "avatar": "string",           "createdAt": "2020-09-02T05:02:23.000Z",           "updatedAt": "2020-09-02T05:02:23.000Z",           "requestCount": 5         },         "is4k": false,         "serverId": 0,         "profileId": 0,         "rootFolder": "string"       }     ],     "createdAt": "2020-09-12T10:00:27.000Z",     "updatedAt": "2020-09-12T10:00:27.000Z"   },   "watchProviders": [     [       {         "iso_3166_1": "string",         "link": "string",         "buy": [           {             "displayPriority": 0,             "logoPath": "string",             "id": 0,             "name": "string"           }         ],         "flatrate": [           {             "displayPriority": 0,             "logoPath": "string",             "id": 0,             "name": "string"           }         ]       }     ]   ] } ``` | *No links* |

Returns list of recommended movies based on provided movie ID in a JSON object.

| Name | Description |
| --- | --- |
| movieId   \*  number  (  path  ) |  |
| page  number  (  query  ) | *Default value* : 1 |
| language  string  (  query  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | List of movies  Media type  Controls `Accept` header.  ```json {   "page": 1,   "totalPages": 20,   "totalResults": 200,   "results": [     {       "id": 1234,       "mediaType": "string",       "popularity": 10,       "posterPath": "string",       "backdropPath": "string",       "voteCount": 0,       "voteAverage": 0,       "genreIds": [         0       ],       "overview": "Overview of the movie",       "originalLanguage": "en",       "title": "Movie Title",       "originalTitle": "Original Movie Title",       "releaseDate": "string",       "adult": false,       "video": false,       "mediaInfo": {         "id": 0,         "tmdbId": 0,         "tvdbId": 0,         "status": 0,         "requests": [           {             "id": 123,             "status": 0,             "media": "string",             "createdAt": "2020-09-12T10:00:27.000Z",             "updatedAt": "2020-09-12T10:00:27.000Z",             "requestedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "modifiedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "is4k": false,             "serverId": 0,             "profileId": 0,             "rootFolder": "string"           }         ],         "createdAt": "2020-09-12T10:00:27.000Z",         "updatedAt": "2020-09-12T10:00:27.000Z"       }     }   ] } ``` | *No links* |

Returns list of similar movies based on the provided movieId in a JSON object.

| Name | Description |
| --- | --- |
| movieId   \*  number  (  path  ) |  |
| page  number  (  query  ) | *Default value* : 1 |
| language  string  (  query  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | List of movies  Media type  Controls `Accept` header.  ```json {   "page": 1,   "totalPages": 20,   "totalResults": 200,   "results": [     {       "id": 1234,       "mediaType": "string",       "popularity": 10,       "posterPath": "string",       "backdropPath": "string",       "voteCount": 0,       "voteAverage": 0,       "genreIds": [         0       ],       "overview": "Overview of the movie",       "originalLanguage": "en",       "title": "Movie Title",       "originalTitle": "Original Movie Title",       "releaseDate": "string",       "adult": false,       "video": false,       "mediaInfo": {         "id": 0,         "tmdbId": 0,         "tvdbId": 0,         "status": 0,         "requests": [           {             "id": 123,             "status": 0,             "media": "string",             "createdAt": "2020-09-12T10:00:27.000Z",             "updatedAt": "2020-09-12T10:00:27.000Z",             "requestedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "modifiedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "is4k": false,             "serverId": 0,             "profileId": 0,             "rootFolder": "string"           }         ],         "createdAt": "2020-09-12T10:00:27.000Z",         "updatedAt": "2020-09-12T10:00:27.000Z"       }     }   ] } ``` | *No links* |

Returns ratings based on the provided movieId in a JSON object.

| Name | Description |
| --- | --- |
| movieId   \*  number  (  path  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Ratings returned  Media type  Controls `Accept` header.  ```json {   "title": "Mulan",   "year": 2020,   "url": "http://www.rottentomatoes.com/m/mulan_2020/",   "criticsScore": 85,   "criticsRating": "Rotten",   "audienceScore": 65,   "audienceRating": "Spilled" } ``` | *No links* |

Returns ratings from RottenTomatoes and IMDB based on the provided movieId in a JSON object.

| Name | Description |
| --- | --- |
| movieId   \*  number  (  path  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Ratings returned  Media type  Controls `Accept` header.  ```json {   "rt": {     "title": "Mulan",     "year": 2020,     "url": "http://www.rottentomatoes.com/m/mulan_2020/",     "criticsScore": 85,     "criticsRating": "Rotten",     "audienceScore": 65,     "audienceRating": "Spilled"   },   "imdb": {     "title": "I am Legend",     "url": "https://www.imdb.com/title/tt0480249",     "criticsScore": 6.5   } } ``` | *No links* |

### [tv](https://api-docs.overseerr.dev/#/tv)

Endpoints related to retrieving TV series and their details.

Returns full TV details in a JSON object.

| Name | Description |
| --- | --- |
| tvId   \*  number  (  path  ) |  |
| language  string  (  query  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | TV details  Media type  Controls `Accept` header.  ```json {   "id": 123,   "backdropPath": "string",   "posterPath": "string",   "contentRatings": {     "results": [       {         "iso_3166_1": "US",         "rating": "TV-14"       }     ]   },   "createdBy": [     {       "id": 0,       "name": "string",       "gender": 0,       "profilePath": "string"     }   ],   "episodeRunTime": [     0   ],   "firstAirDate": "string",   "genres": [     {       "id": 1,       "name": "Adventure"     }   ],   "homepage": "string",   "inProduction": true,   "languages": [     "string"   ],   "lastAirDate": "string",   "lastEpisodeToAir": {     "id": 0,     "name": "string",     "airDate": "string",     "episodeNumber": 0,     "overview": "string",     "productionCode": "string",     "seasonNumber": 0,     "showId": 0,     "stillPath": "string",     "voteAverage": 0,     "voteCount": 0   },   "name": "string",   "nextEpisodeToAir": {     "id": 0,     "name": "string",     "airDate": "string",     "episodeNumber": 0,     "overview": "string",     "productionCode": "string",     "seasonNumber": 0,     "showId": 0,     "stillPath": "string",     "voteAverage": 0,     "voteCount": 0   },   "networks": [     {       "id": 1,       "logoPath": "string",       "originCountry": "string",       "name": "string"     }   ],   "numberOfEpisodes": 0,   "numberOfSeason": 0,   "originCountry": [     "string"   ],   "originalLanguage": "string",   "originalName": "string",   "overview": "string",   "popularity": 0,   "productionCompanies": [     {       "id": 1,       "logoPath": "string",       "originCountry": "string",       "name": "string"     }   ],   "productionCountries": [     {       "iso_3166_1": "string",       "name": "string"     }   ],   "spokenLanguages": [     {       "englishName": "English",       "iso_639_1": "en",       "name": "English"     }   ],   "seasons": [     {       "id": 0,       "airDate": "string",       "episodeCount": 0,       "name": "string",       "overview": "string",       "posterPath": "string",       "seasonNumber": 0,       "episodes": [         {           "id": 0,           "name": "string",           "airDate": "string",           "episodeNumber": 0,           "overview": "string",           "productionCode": "string",           "seasonNumber": 0,           "showId": 0,           "stillPath": "string",           "voteAverage": 0,           "voteCount": 0         }       ]     }   ],   "status": "string",   "tagline": "string",   "type": "string",   "voteAverage": 0,   "voteCount": 0,   "credits": {     "cast": [       {         "id": 123,         "castId": 1,         "character": "Some Character Name",         "creditId": "string",         "gender": 0,         "name": "Some Persons Name",         "order": 0,         "profilePath": "string"       }     ],     "crew": [       {         "id": 123,         "creditId": "string",         "gender": 0,         "name": "Some Persons Name",         "job": "string",         "department": "string",         "profilePath": "string"       }     ]   },   "externalIds": {     "facebookId": "string",     "freebaseId": "string",     "freebaseMid": "string",     "imdbId": "string",     "instagramId": "string",     "tvdbId": 0,     "tvrageId": 0,     "twitterId": "string"   },   "keywords": [     {       "id": 1,       "name": "anime"     }   ],   "mediaInfo": {     "id": 0,     "tmdbId": 0,     "tvdbId": 0,     "status": 0,     "requests": [       {         "id": 123,         "status": 0,         "media": "string",         "createdAt": "2020-09-12T10:00:27.000Z",         "updatedAt": "2020-09-12T10:00:27.000Z",         "requestedBy": {           "id": 1,           "email": "hey@itsme.com",           "username": "string",           "plexToken": "string",           "plexUsername": "string",           "userType": 1,           "permissions": 0,           "avatar": "string",           "createdAt": "2020-09-02T05:02:23.000Z",           "updatedAt": "2020-09-02T05:02:23.000Z",           "requestCount": 5         },         "modifiedBy": {           "id": 1,           "email": "hey@itsme.com",           "username": "string",           "plexToken": "string",           "plexUsername": "string",           "userType": 1,           "permissions": 0,           "avatar": "string",           "createdAt": "2020-09-02T05:02:23.000Z",           "updatedAt": "2020-09-02T05:02:23.000Z",           "requestCount": 5         },         "is4k": false,         "serverId": 0,         "profileId": 0,         "rootFolder": "string"       }     ],     "createdAt": "2020-09-12T10:00:27.000Z",     "updatedAt": "2020-09-12T10:00:27.000Z"   },   "watchProviders": [     [       {         "iso_3166_1": "string",         "link": "string",         "buy": [           {             "displayPriority": 0,             "logoPath": "string",             "id": 0,             "name": "string"           }         ],         "flatrate": [           {             "displayPriority": 0,             "logoPath": "string",             "id": 0,             "name": "string"           }         ]       }     ]   ] } ``` | *No links* |

Returns season details with a list of episodes in a JSON object.

| Name | Description |
| --- | --- |
| tvId   \*  number  (  path  ) |  |
| seasonId   \*  number  (  path  ) |  |
| language  string  (  query  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | TV details  Media type  Controls `Accept` header.  ```json {   "id": 0,   "airDate": "string",   "episodeCount": 0,   "name": "string",   "overview": "string",   "posterPath": "string",   "seasonNumber": 0,   "episodes": [     {       "id": 0,       "name": "string",       "airDate": "string",       "episodeNumber": 0,       "overview": "string",       "productionCode": "string",       "seasonNumber": 0,       "showId": 0,       "stillPath": "string",       "voteAverage": 0,       "voteCount": 0     }   ] } ``` | *No links* |

Returns list of recommended TV series based on the provided tvId in a JSON object.

| Name | Description |
| --- | --- |
| tvId   \*  number  (  path  ) |  |
| page  number  (  query  ) | *Default value* : 1 |
| language  string  (  query  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | List of TV series  Media type  Controls `Accept` header.  ```json {   "page": 1,   "totalPages": 20,   "totalResults": 200,   "results": [     {       "id": 1234,       "mediaType": "string",       "popularity": 10,       "posterPath": "string",       "backdropPath": "string",       "voteCount": 0,       "voteAverage": 0,       "genreIds": [         0       ],       "overview": "Overview of the movie",       "originalLanguage": "en",       "name": "TV Show Name",       "originalName": "Original TV Show Name",       "originCountry": [         "string"       ],       "firstAirDate": "string",       "mediaInfo": {         "id": 0,         "tmdbId": 0,         "tvdbId": 0,         "status": 0,         "requests": [           {             "id": 123,             "status": 0,             "media": "string",             "createdAt": "2020-09-12T10:00:27.000Z",             "updatedAt": "2020-09-12T10:00:27.000Z",             "requestedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "modifiedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "is4k": false,             "serverId": 0,             "profileId": 0,             "rootFolder": "string"           }         ],         "createdAt": "2020-09-12T10:00:27.000Z",         "updatedAt": "2020-09-12T10:00:27.000Z"       }     }   ] } ``` | *No links* |

Returns list of similar TV series based on the provided tvId in a JSON object.

| Name | Description |
| --- | --- |
| tvId   \*  number  (  path  ) |  |
| page  number  (  query  ) | *Default value* : 1 |
| language  string  (  query  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | List of TV series  Media type  Controls `Accept` header.  ```json {   "page": 1,   "totalPages": 20,   "totalResults": 200,   "results": [     {       "id": 1234,       "mediaType": "string",       "popularity": 10,       "posterPath": "string",       "backdropPath": "string",       "voteCount": 0,       "voteAverage": 0,       "genreIds": [         0       ],       "overview": "Overview of the movie",       "originalLanguage": "en",       "name": "TV Show Name",       "originalName": "Original TV Show Name",       "originCountry": [         "string"       ],       "firstAirDate": "string",       "mediaInfo": {         "id": 0,         "tmdbId": 0,         "tvdbId": 0,         "status": 0,         "requests": [           {             "id": 123,             "status": 0,             "media": "string",             "createdAt": "2020-09-12T10:00:27.000Z",             "updatedAt": "2020-09-12T10:00:27.000Z",             "requestedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "modifiedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "is4k": false,             "serverId": 0,             "profileId": 0,             "rootFolder": "string"           }         ],         "createdAt": "2020-09-12T10:00:27.000Z",         "updatedAt": "2020-09-12T10:00:27.000Z"       }     }   ] } ``` | *No links* |

Returns ratings based on provided tvId in a JSON object.

| Name | Description |
| --- | --- |
| tvId   \*  number  (  path  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Ratings returned  Media type  Controls `Accept` header.  ```json {   "title": "The Boys",   "year": 2019,   "url": "http://www.rottentomatoes.com/m/mulan_2020/",   "criticsScore": 85,   "criticsRating": "Rotten" } ``` | *No links* |

### [other](https://api-docs.overseerr.dev/#/other)

Endpoints related to other TMDB data

Returns a single keyword in JSON format.

| Name | Description |
| --- | --- |
| keywordId   \*  number  (  path  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Keyword returned  Media type  Controls `Accept` header.  ```json {   "id": 1,   "name": "anime" } ``` | *No links* |

Returns a list of all available watch provider regions.

| Code | Description | Links |
| --- | --- | --- |
| 200 | Watch provider regions returned  Media type  Controls `Accept` header.  ```json [   {     "iso_3166_1": "string",     "english_name": "string",     "native_name": "string"   } ] ``` | *No links* |

Returns a list of all available watch providers for movies.

| Name | Description |
| --- | --- |
| watchRegion   \*  string  (  query  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Watch providers for movies returned  Media type  Controls `Accept` header.  ```json [   {     "displayPriority": 0,     "logoPath": "string",     "id": 0,     "name": "string"   } ] ``` | *No links* |

Returns a list of all available watch providers for series.

| Name | Description |
| --- | --- |
| watchRegion   \*  string  (  query  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Watch providers for series returned  Media type  Controls `Accept` header.  ```json [   {     "displayPriority": 0,     "logoPath": "string",     "id": 0,     "name": "string"   } ] ``` | *No links* |

### [person](https://api-docs.overseerr.dev/#/person)

Endpoints related to retrieving person details.

Returns person details based on provided personId in a JSON object.

| Name | Description |
| --- | --- |
| personId   \*  number  (  path  ) |  |
| language  string  (  query  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Returned person  Media type  Controls `Accept` header.  ```json {   "id": 1,   "name": "string",   "deathday": "string",   "knownForDepartment": "string",   "alsoKnownAs": [     "string"   ],   "gender": "string",   "biography": "string",   "popularity": "string",   "placeOfBirth": "string",   "profilePath": "string",   "adult": true,   "imdbId": "string",   "homepage": "string" } ``` | *No links* |

Returns the person's combined credits based on the provided personId in a JSON object.

| Name | Description |
| --- | --- |
| personId   \*  number  (  path  ) |  |
| language  string  (  query  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Returned combined credits  Media type  Controls `Accept` header.  ```json {   "cast": [     {       "id": 1,       "originalLanguage": "string",       "episodeCount": 0,       "overview": "string",       "originCountry": [         "string"       ],       "originalName": "string",       "voteCount": 0,       "name": "string",       "mediaType": "string",       "popularity": 0,       "creditId": "string",       "backdropPath": "string",       "firstAirDate": "string",       "voteAverage": 0,       "genreIds": [         0       ],       "posterPath": "string",       "originalTitle": "string",       "video": true,       "title": "string",       "adult": true,       "releaseDate": "string",       "character": "string",       "mediaInfo": {         "id": 0,         "tmdbId": 0,         "tvdbId": 0,         "status": 0,         "requests": [           {             "id": 123,             "status": 0,             "media": "string",             "createdAt": "2020-09-12T10:00:27.000Z",             "updatedAt": "2020-09-12T10:00:27.000Z",             "requestedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "modifiedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "is4k": false,             "serverId": 0,             "profileId": 0,             "rootFolder": "string"           }         ],         "createdAt": "2020-09-12T10:00:27.000Z",         "updatedAt": "2020-09-12T10:00:27.000Z"       }     }   ],   "crew": [     {       "id": 1,       "originalLanguage": "string",       "episodeCount": 0,       "overview": "string",       "originCountry": [         "string"       ],       "originalName": "string",       "voteCount": 0,       "name": "string",       "mediaType": "string",       "popularity": 0,       "creditId": "string",       "backdropPath": "string",       "firstAirDate": "string",       "voteAverage": 0,       "genreIds": [         0       ],       "posterPath": "string",       "originalTitle": "string",       "video": true,       "title": "string",       "adult": true,       "releaseDate": "string",       "department": "string",       "job": "string",       "mediaInfo": {         "id": 0,         "tmdbId": 0,         "tvdbId": 0,         "status": 0,         "requests": [           {             "id": 123,             "status": 0,             "media": "string",             "createdAt": "2020-09-12T10:00:27.000Z",             "updatedAt": "2020-09-12T10:00:27.000Z",             "requestedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "modifiedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "is4k": false,             "serverId": 0,             "profileId": 0,             "rootFolder": "string"           }         ],         "createdAt": "2020-09-12T10:00:27.000Z",         "updatedAt": "2020-09-12T10:00:27.000Z"       }     }   ],   "id": 0 } ``` | *No links* |

### [media](https://api-docs.overseerr.dev/#/media)

Endpoints related to media management.

Updates a media item's status and returns the media in JSON format

| Name | Description |
| --- | --- |
| mediaId   \*  string  (  path  ) | Media ID  *Example* : 1 |
| status   \*  string  (  path  ) | New status  *Available values* : available, partial, processing, pending, unknown  *Example* : available |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Returned media  Media type  Controls `Accept` header.  ```json {   "id": 0,   "tmdbId": 0,   "tvdbId": 0,   "status": 0,   "requests": [     {       "id": 123,       "status": 0,       "media": "string",       "createdAt": "2020-09-12T10:00:27.000Z",       "updatedAt": "2020-09-12T10:00:27.000Z",       "requestedBy": {         "id": 1,         "email": "hey@itsme.com",         "username": "string",         "plexToken": "string",         "plexUsername": "string",         "userType": 1,         "permissions": 0,         "avatar": "string",         "createdAt": "2020-09-02T05:02:23.000Z",         "updatedAt": "2020-09-02T05:02:23.000Z",         "requestCount": 5       },       "modifiedBy": {         "id": 1,         "email": "hey@itsme.com",         "username": "string",         "plexToken": "string",         "plexUsername": "string",         "userType": 1,         "permissions": 0,         "avatar": "string",         "createdAt": "2020-09-02T05:02:23.000Z",         "updatedAt": "2020-09-02T05:02:23.000Z",         "requestCount": 5       },       "is4k": false,       "serverId": 0,       "profileId": 0,       "rootFolder": "string"     }   ],   "createdAt": "2020-09-12T10:00:27.000Z",   "updatedAt": "2020-09-12T10:00:27.000Z" } ``` | *No links* |

### [collection](https://api-docs.overseerr.dev/#/collection)

Endpoints related to retrieving collection details.

Returns full collection details in a JSON object.

| Name | Description |
| --- | --- |
| collectionId   \*  number  (  path  ) |  |
| language  string  (  query  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Collection details  Media type  Controls `Accept` header.  ```json {   "id": 123,   "name": "A Movie Collection",   "overview": "Overview of collection",   "posterPath": "string",   "backdropPath": "string",   "parts": [     {       "id": 1234,       "mediaType": "string",       "popularity": 10,       "posterPath": "string",       "backdropPath": "string",       "voteCount": 0,       "voteAverage": 0,       "genreIds": [         0       ],       "overview": "Overview of the movie",       "originalLanguage": "en",       "title": "Movie Title",       "originalTitle": "Original Movie Title",       "releaseDate": "string",       "adult": false,       "video": false,       "mediaInfo": {         "id": 0,         "tmdbId": 0,         "tvdbId": 0,         "status": 0,         "requests": [           {             "id": 123,             "status": 0,             "media": "string",             "createdAt": "2020-09-12T10:00:27.000Z",             "updatedAt": "2020-09-12T10:00:27.000Z",             "requestedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "modifiedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "is4k": false,             "serverId": 0,             "profileId": 0,             "rootFolder": "string"           }         ],         "createdAt": "2020-09-12T10:00:27.000Z",         "updatedAt": "2020-09-12T10:00:27.000Z"       }     }   ] } ``` | *No links* |

### [service](https://api-docs.overseerr.dev/#/service)

Endpoints related to getting service (Radarr/Sonarr) details.

Returns a list of Radarr server IDs and names in a JSON object.

| Code | Description | Links |
| --- | --- | --- |
| 200 | Request successful  Media type  Controls `Accept` header.  ```json [   {     "id": 0,     "name": "Radarr Main",     "hostname": "127.0.0.1",     "port": 7878,     "apiKey": "exampleapikey",     "useSsl": false,     "baseUrl": "string",     "activeProfileId": 1,     "activeProfileName": "720p/1080p",     "activeDirectory": "/movies",     "is4k": false,     "minimumAvailability": "In Cinema",     "isDefault": false,     "externalUrl": "http://radarr.example.com",     "syncEnabled": false,     "preventSearch": false   } ] ``` | *No links* |

Returns a Radarr server's quality profile and root folder details in a JSON object.

| Name | Description |
| --- | --- |
| radarrId   \*  number  (  path  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Request successful  Media type  Controls `Accept` header.  ```json {   "server": {     "id": 0,     "name": "Radarr Main",     "hostname": "127.0.0.1",     "port": 7878,     "apiKey": "exampleapikey",     "useSsl": false,     "baseUrl": "string",     "activeProfileId": 1,     "activeProfileName": "720p/1080p",     "activeDirectory": "/movies",     "is4k": false,     "minimumAvailability": "In Cinema",     "isDefault": false,     "externalUrl": "http://radarr.example.com",     "syncEnabled": false,     "preventSearch": false   },   "profiles": {     "id": 1,     "name": "720p/1080p"   } } ``` | *No links* |

Returns a list of Sonarr server IDs and names in a JSON object.

| Code | Description | Links |
| --- | --- | --- |
| 200 | Request successful  Media type  Controls `Accept` header.  ```json [   {     "id": 0,     "name": "Sonarr Main",     "hostname": "127.0.0.1",     "port": 8989,     "apiKey": "exampleapikey",     "useSsl": false,     "baseUrl": "string",     "activeProfileId": 1,     "activeProfileName": "720p/1080p",     "activeDirectory": "/tv/",     "activeLanguageProfileId": 1,     "activeAnimeProfileId": 0,     "activeAnimeLanguageProfileId": 0,     "activeAnimeProfileName": "720p/1080p",     "activeAnimeDirectory": "string",     "is4k": false,     "enableSeasonFolders": false,     "isDefault": false,     "externalUrl": "http://radarr.example.com",     "syncEnabled": false,     "preventSearch": false   } ] ``` | *No links* |

Returns a Sonarr server's quality profile and root folder details in a JSON object.

| Name | Description |
| --- | --- |
| sonarrId   \*  number  (  path  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Request successful  Media type  Controls `Accept` header.  ```json {   "server": {     "id": 0,     "name": "Sonarr Main",     "hostname": "127.0.0.1",     "port": 8989,     "apiKey": "exampleapikey",     "useSsl": false,     "baseUrl": "string",     "activeProfileId": 1,     "activeProfileName": "720p/1080p",     "activeDirectory": "/tv/",     "activeLanguageProfileId": 1,     "activeAnimeProfileId": 0,     "activeAnimeLanguageProfileId": 0,     "activeAnimeProfileName": "720p/1080p",     "activeAnimeDirectory": "string",     "is4k": false,     "enableSeasonFolders": false,     "isDefault": false,     "externalUrl": "http://radarr.example.com",     "syncEnabled": false,     "preventSearch": false   },   "profiles": {     "id": 1,     "name": "720p/1080p"   } } ``` | *No links* |

Returns a list of series returned by searching for the name in Sonarr.

| Name | Description |
| --- | --- |
| tmdbId   \*  number  (  path  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Request successful  Media type  Controls `Accept` header.  ```json [   {     "title": "COVID-25",     "sortTitle": "covid 25",     "seasonCount": 1,     "status": "upcoming",     "overview": "The thread is picked up again by Marianne Schmidt which ...",     "network": "CBS",     "airTime": "02:15",     "images": [       {         "coverType": "banner",         "url": "/sonarr/MediaCoverProxy/6467f05d9872726ad08cbf920e5fee4bf69198682260acab8eab5d3c2c958e92/5c8f116c6aa5c.jpg"       }     ],     "remotePoster": "https://artworks.thetvdb.com/banners/posters/5c8f116129983.jpg",     "seasons": [       {         "seasonNumber": 1,         "monitored": true       }     ],     "year": 2015,     "path": "string",     "profileId": 0,     "languageProfileId": 0,     "seasonFolder": true,     "monitored": true,     "useSceneNumbering": true,     "runtime": 0,     "tvdbId": 12345,     "tvRageId": 0,     "tvMazeId": 0,     "firstAired": "string",     "lastInfoSync": "string",     "seriesType": "string",     "cleanTitle": "string",     "imdbId": "string",     "titleSlug": "string",     "certification": "string",     "genres": [       "string"     ],     "tags": [       "string"     ],     "added": "string",     "ratings": [       {         "votes": 0,         "value": 0       }     ],     "qualityProfileId": 0,     "id": 0,     "rootFolderPath": "string",     "addOptions": [       {         "ignoreEpisodesWithFiles": true,         "ignoreEpisodesWithoutFiles": true,         "searchForMissingEpisodes": true       }     ]   } ] ``` | *No links* |

### [tmdb](https://api-docs.overseerr.dev/#/tmdb)

Returns a list of regions in a JSON object.

| Code | Description | Links |
| --- | --- | --- |
| 200 | Results  Media type  Controls `Accept` header.  ```json [   {     "iso_3166_1": "US",     "english_name": "United States of America"   } ] ``` | *No links* |

Returns a list of languages in a JSON object.

| Code | Description | Links |
| --- | --- | --- |
| 200 | Results  Media type  Controls `Accept` header.  ```json [   {     "iso_639_1": "en",     "english_name": "English",     "name": "English"   } ] ``` | *No links* |

Returns movie studio details in a JSON object.

| Name | Description |
| --- | --- |
| studioId   \*  number  (  path  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Movie studio details  Media type  Controls `Accept` header.  ```json {   "id": 1,   "logoPath": "string",   "originCountry": "string",   "name": "string" } ``` | *No links* |

Returns TV network details in a JSON object.

| Name | Description |
| --- | --- |
| networkId   \*  number  (  path  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | TV network details  Media type  Controls `Accept` header.  ```json {   "id": 1,   "logoPath": "string",   "originCountry": "string",   "name": "string" } ``` | *No links* |

Returns a list of genres in a JSON array.

| Name | Description |
| --- | --- |
| language  string  (  query  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Results  Media type  Controls `Accept` header.  ```json [   {     "id": 10751,     "name": "Family"   } ] ``` | *No links* |

Returns a list of genres in a JSON array.

| Name | Description |
| --- | --- |
| language  string  (  query  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Results  Media type  Controls `Accept` header.  ```json [   {     "id": 18,     "name": "Drama"   } ] ``` | *No links* |

Returns a list of backdrop image paths in a JSON array.

| Code | Description | Links |
| --- | --- | --- |
| 200 | Results  Media type  Controls `Accept` header.  ```json [   "string" ] ``` | *No links* |

### [issue](https://api-docs.overseerr.dev/#/issue)

Returns a list of issues in JSON format.

| Name | Description |
| --- | --- |
| take  number  (  query  ) |  |
| skip  number  (  query  ) |  |
| sort  string  (  query  ) | *Available values* : added, modified  *Default value* : added |
| filter  string  (  query  ) | *Available values* : all, open, resolved  *Default value* : open |
| requestedBy  number  (  query  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Issues returned  Media type  Controls `Accept` header.  ```json {   "pageInfo": {     "page": 1,     "pages": 10,     "results": 100   },   "results": [     {       "id": 1,       "issueType": 1,       "media": {         "id": 0,         "tmdbId": 0,         "tvdbId": 0,         "status": 0,         "requests": [           {             "id": 123,             "status": 0,             "media": "string",             "createdAt": "2020-09-12T10:00:27.000Z",             "updatedAt": "2020-09-12T10:00:27.000Z",             "requestedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "modifiedBy": {               "id": 1,               "email": "hey@itsme.com",               "username": "string",               "plexToken": "string",               "plexUsername": "string",               "userType": 1,               "permissions": 0,               "avatar": "string",               "createdAt": "2020-09-02T05:02:23.000Z",               "updatedAt": "2020-09-02T05:02:23.000Z",               "requestCount": 5             },             "is4k": false,             "serverId": 0,             "profileId": 0,             "rootFolder": "string"           }         ],         "createdAt": "2020-09-12T10:00:27.000Z",         "updatedAt": "2020-09-12T10:00:27.000Z"       },       "createdBy": {         "id": 1,         "email": "hey@itsme.com",         "username": "string",         "plexToken": "string",         "plexUsername": "string",         "userType": 1,         "permissions": 0,         "avatar": "string",         "createdAt": "2020-09-02T05:02:23.000Z",         "updatedAt": "2020-09-02T05:02:23.000Z",         "requestCount": 5       },       "modifiedBy": {         "id": 1,         "email": "hey@itsme.com",         "username": "string",         "plexToken": "string",         "plexUsername": "string",         "userType": 1,         "permissions": 0,         "avatar": "string",         "createdAt": "2020-09-02T05:02:23.000Z",         "updatedAt": "2020-09-02T05:02:23.000Z",         "requestCount": 5       },       "comments": [         {           "id": 1,           "user": {             "id": 1,             "email": "hey@itsme.com",             "username": "string",             "plexToken": "string",             "plexUsername": "string",             "userType": 1,             "permissions": 0,             "avatar": "string",             "createdAt": "2020-09-02T05:02:23.000Z",             "updatedAt": "2020-09-02T05:02:23.000Z",             "requestCount": 5           },           "message": "A comment"         }       ]     }   ] } ``` | *No links* |

```json
{
  "issueType": 0,
  "message": "string",
  "mediaId": 0
}
```

| Code | Description | Links |
| --- | --- | --- |
| 201 | Succesfully created the issue  Media type  Controls `Accept` header.  ```json {   "id": 1,   "issueType": 1,   "media": {     "id": 0,     "tmdbId": 0,     "tvdbId": 0,     "status": 0,     "requests": [       {         "id": 123,         "status": 0,         "media": "string",         "createdAt": "2020-09-12T10:00:27.000Z",         "updatedAt": "2020-09-12T10:00:27.000Z",         "requestedBy": {           "id": 1,           "email": "hey@itsme.com",           "username": "string",           "plexToken": "string",           "plexUsername": "string",           "userType": 1,           "permissions": 0,           "avatar": "string",           "createdAt": "2020-09-02T05:02:23.000Z",           "updatedAt": "2020-09-02T05:02:23.000Z",           "requestCount": 5         },         "modifiedBy": {           "id": 1,           "email": "hey@itsme.com",           "username": "string",           "plexToken": "string",           "plexUsername": "string",           "userType": 1,           "permissions": 0,           "avatar": "string",           "createdAt": "2020-09-02T05:02:23.000Z",           "updatedAt": "2020-09-02T05:02:23.000Z",           "requestCount": 5         },         "is4k": false,         "serverId": 0,         "profileId": 0,         "rootFolder": "string"       }     ],     "createdAt": "2020-09-12T10:00:27.000Z",     "updatedAt": "2020-09-12T10:00:27.000Z"   },   "createdBy": {     "id": 1,     "email": "hey@itsme.com",     "username": "string",     "plexToken": "string",     "plexUsername": "string",     "userType": 1,     "permissions": 0,     "avatar": "string",     "createdAt": "2020-09-02T05:02:23.000Z",     "updatedAt": "2020-09-02T05:02:23.000Z",     "requestCount": 5   },   "modifiedBy": {     "id": 1,     "email": "hey@itsme.com",     "username": "string",     "plexToken": "string",     "plexUsername": "string",     "userType": 1,     "permissions": 0,     "avatar": "string",     "createdAt": "2020-09-02T05:02:23.000Z",     "updatedAt": "2020-09-02T05:02:23.000Z",     "requestCount": 5   },   "comments": [     {       "id": 1,       "user": {         "id": 1,         "email": "hey@itsme.com",         "username": "string",         "plexToken": "string",         "plexUsername": "string",         "userType": 1,         "permissions": 0,         "avatar": "string",         "createdAt": "2020-09-02T05:02:23.000Z",         "updatedAt": "2020-09-02T05:02:23.000Z",         "requestCount": 5       },       "message": "A comment"     }   ] } ``` | *No links* |

Returns the number of open and closed issues, as well as the number of issues of each type.

| Code | Description | Links |
| --- | --- | --- |
| 200 | Issue counts returned  Media type  Controls `Accept` header.  ```json {   "total": 0,   "video": 0,   "audio": 0,   "subtitles": 0,   "others": 0,   "open": 0,   "closed": 0 } ``` | *No links* |

Returns a single issue in JSON format.

| Name | Description |
| --- | --- |
| issueId   \*  number  (  path  ) |  |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Issues returned  Media type  Controls `Accept` header.  ```json {   "id": 1,   "issueType": 1,   "media": {     "id": 0,     "tmdbId": 0,     "tvdbId": 0,     "status": 0,     "requests": [       {         "id": 123,         "status": 0,         "media": "string",         "createdAt": "2020-09-12T10:00:27.000Z",         "updatedAt": "2020-09-12T10:00:27.000Z",         "requestedBy": {           "id": 1,           "email": "hey@itsme.com",           "username": "string",           "plexToken": "string",           "plexUsername": "string",           "userType": 1,           "permissions": 0,           "avatar": "string",           "createdAt": "2020-09-02T05:02:23.000Z",           "updatedAt": "2020-09-02T05:02:23.000Z",           "requestCount": 5         },         "modifiedBy": {           "id": 1,           "email": "hey@itsme.com",           "username": "string",           "plexToken": "string",           "plexUsername": "string",           "userType": 1,           "permissions": 0,           "avatar": "string",           "createdAt": "2020-09-02T05:02:23.000Z",           "updatedAt": "2020-09-02T05:02:23.000Z",           "requestCount": 5         },         "is4k": false,         "serverId": 0,         "profileId": 0,         "rootFolder": "string"       }     ],     "createdAt": "2020-09-12T10:00:27.000Z",     "updatedAt": "2020-09-12T10:00:27.000Z"   },   "createdBy": {     "id": 1,     "email": "hey@itsme.com",     "username": "string",     "plexToken": "string",     "plexUsername": "string",     "userType": 1,     "permissions": 0,     "avatar": "string",     "createdAt": "2020-09-02T05:02:23.000Z",     "updatedAt": "2020-09-02T05:02:23.000Z",     "requestCount": 5   },   "modifiedBy": {     "id": 1,     "email": "hey@itsme.com",     "username": "string",     "plexToken": "string",     "plexUsername": "string",     "userType": 1,     "permissions": 0,     "avatar": "string",     "createdAt": "2020-09-02T05:02:23.000Z",     "updatedAt": "2020-09-02T05:02:23.000Z",     "requestCount": 5   },   "comments": [     {       "id": 1,       "user": {         "id": 1,         "email": "hey@itsme.com",         "username": "string",         "plexToken": "string",         "plexUsername": "string",         "userType": 1,         "permissions": 0,         "avatar": "string",         "createdAt": "2020-09-02T05:02:23.000Z",         "updatedAt": "2020-09-02T05:02:23.000Z",         "requestCount": 5       },       "message": "A comment"     }   ] } ``` | *No links* |

Removes an issue. If the user has the `MANAGE_ISSUES` permission, any issue can be removed. Otherwise, only a users own issues can be removed.

| Name | Description |
| --- | --- |
| issueId   \*  string  (  path  ) | Issue ID  *Example* : 1 |

| Code | Description | Links |
| --- | --- | --- |
| 204 | Succesfully removed issue | *No links* |

Updates an issue's status to approved or declined. Also returns the issue in a JSON object.

Requires the `MANAGE_ISSUES` permission or `ADMIN`.

| Name | Description |
| --- | --- |
| issueId   \*  string  (  path  ) | Issue ID |
| status   \*  string  (  path  ) | New status  *Available values* : open, resolved |

| Code | Description | Links |
| --- | --- | --- |
| 200 | Issue status changed  Media type  Controls `Accept` header.  ```json {   "id": 1,   "issueType": 1,   "media": {     "id": 0,     "tmdbId": 0,     "tvdbId": 0,     "status": 0,     "requests": [       {         "id": 123,         "status": 0,         "media": "string",         "createdAt": "2020-09-12T10:00:27.000Z",         "updatedAt": "2020-09-12T10:00:27.000Z",         "requestedBy": {           "id": 1,           "email": "hey@itsme.com",           "username": "string",           "plexToken": "string",           "plexUsername": "string",           "userType": 1,           "permissions": 0,           "avatar": "string",           "createdAt": "2020-09-02T05:02:23.000Z",           "updatedAt": "2020-09-02T05:02:23.000Z",           "requestCount": 5         },         "modifiedBy": {           "id": 1,           "email": "hey@itsme.com",           "username": "string",           "plexToken": "string",           "plexUsername": "string",           "userType": 1,           "permissions": 0,           "avatar": "string",           "createdAt": "2020-09-02T05:02:23.000Z",           "updatedAt": "2020-09-02T05:02:23.000Z",           "requestCount": 5         },         "is4k": false,         "serverId": 0,         "profileId": 0,         "rootFolder": "string"       }     ],     "createdAt": "2020-09-12T10:00:27.000Z",     "updatedAt": "2020-09-12T10:00:27.000Z"   },   "createdBy": {     "id": 1,     "email": "hey@itsme.com",     "username": "string",     "plexToken": "string",     "plexUsername": "string",     "userType": 1,     "permissions": 0,     "avatar": "string",     "createdAt": "2020-09-02T05:02:23.000Z",     "updatedAt": "2020-09-02T05:02:23.000Z",     "requestCount": 5   },   "modifiedBy": {     "id": 1,     "email": "hey@itsme.com",     "username": "string",     "plexToken": "string",     "plexUsername": "string",     "userType": 1,     "permissions": 0,     "avatar": "string",     "createdAt": "2020-09-02T05:02:23.000Z",     "updatedAt": "2020-09-02T05:02:23.000Z",     "requestCount": 5   },   "comments": [     {       "id": 1,       "user": {         "id": 1,         "email": "hey@itsme.com",         "username": "string",         "plexToken": "string",         "plexUsername": "string",         "userType": 1,         "permissions": 0,         "avatar": "string",         "createdAt": "2020-09-02T05:02:23.000Z",         "updatedAt": "2020-09-02T05:02:23.000Z",         "requestCount": 5       },       "message": "A comment"     }   ] } ``` | *No links* |

{

| id\* | integer   example: 1   readOnly: true |
| --- | --- |
| email\* | string   example: hey@itsme.com   readOnly: true |
| username | string |
| plexToken | string   readOnly: true |
| plexUsername | string   readOnly: true |
| userType | integer   example: 1   readOnly: true |
| permissions | number   example: 0 |
| avatar | string   readOnly: true |
| createdAt\* | string   example: 2020-09-02T05:02:23.000Z   readOnly: true |
| updatedAt\* | string   example: 2020-09-02T05:02:23.000Z   readOnly: true |
| requestCount | number   example: 5   readOnly: true |

}

{

| locale | string |
| --- | --- |
| region | string |
| originalLanguage | string |

}

{

| apiKey | string   readOnly: true |
| --- | --- |
| appLanguage | string   example: en |
| applicationTitle | string   example: Overseerr |
| applicationUrl | string   example: https://os.example.com |
| trustProxy | boolean   example: true |
| csrfProtection | boolean   example: false |
| hideAvailable | boolean   example: false |
| partialRequestsEnabled | boolean   example: false |
| localLogin | boolean   example: true |
| newPlexLogin | boolean   example: true |
| defaultPermissions | number   example: 32 |

}

{

| id\* | string |
| --- | --- |
| name\* | string   example: Movies |
| enabled\* | boolean   example: false |

}

{

| name\* | string   example: Main Server   readOnly: true |
| --- | --- |
| machineId\* | string   example: 1234123412341234   readOnly: true |
| ip\* | string   example: 127.0.0.1 |
| port\* | number   example: 32400 |
| useSsl | boolean   nullable: true |
| libraries |  |
| webAppUrl | string   nullable: true   example: https://app.plex.tv/desktop |

}

{

| protocol\* | string   example: https |
| --- | --- |
| address\* | string   example: 127.0.0.1 |
| port\* | number   example: 32400 |
| uri\* | string   example: https://127-0-0-1.2ab6ce1a093d465e910def96cf4e4799.plex.direct:32400 |
| local\* | boolean   example: true |
| status | number   example: 200 |
| message | string   example: OK |

}

{

| name\* | string   example: My Plex Server |
| --- | --- |
| product\* | string   example: Plex Media Server |
| productVersion\* | string   example: 1.21 |
| platform\* | string   example: Linux |
| platformVersion | string   example: default/linux/amd64/17.1/systemd |
| device\* | string   example: PC |
| clientIdentifier\* | string   example: 85a943ce-a0cc-4d2a-a4ec-f74f06e40feb |
| createdAt\* | string   example: 2021-01-01T00:00:00.000Z |
| lastSeenAt\* | string   example: 2021-01-01T00:00:00.000Z |
| provides\* |  |
| owned\* | boolean   example: true |
| ownerID | string   example: 12345 |
| home | boolean   example: true |
| sourceTitle | string   example: xyzabc |
| accessToken | string   example: supersecretaccesstoken |
| publicAddress | string   example: 127.0.0.1 |
| httpsRequired | boolean   example: true |
| synced | boolean   example: true |
| relay | boolean   example: true |
| dnsRebindingProtection | boolean   example: false |
| natLoopbackSupported | boolean   example: false |
| publicAddressMatches | boolean   example: false |
| presence | boolean   example: true |
| connection\* |  |

}

{

| hostname | string   nullable: true   example: tautulli.example.com |
| --- | --- |
| port | number   nullable: true   example: 8181 |
| useSsl | boolean   nullable: true |
| apiKey | string   nullable: true |
| externalUrl | string   nullable: true |

}

{

| id | number   example: 0   readOnly: true |
| --- | --- |
| name\* | string   example: Radarr Main |
| hostname\* | string   example: 127.0.0.1 |
| port\* | number   example: 7878 |
| apiKey\* | string   example: exampleapikey |
| useSsl\* | boolean   example: false |
| baseUrl | string |
| activeProfileId\* | number   example: 1 |
| activeProfileName\* | string   example: 720p/1080p |
| activeDirectory\* | string   example: /movies |
| is4k\* | boolean   example: false |
| minimumAvailability\* | string   example: In Cinema |
| isDefault\* | boolean   example: false |
| externalUrl | string   example: http://radarr.example.com |
| syncEnabled | boolean   example: false |
| preventSearch | boolean   example: false |

}

{

| id | number   example: 0   readOnly: true |
| --- | --- |
| name\* | string   example: Sonarr Main |
| hostname\* | string   example: 127.0.0.1 |
| port\* | number   example: 8989 |
| apiKey\* | string   example: exampleapikey |
| useSsl\* | boolean   example: false |
| baseUrl | string |
| activeProfileId\* | number   example: 1 |
| activeProfileName\* | string   example: 720p/1080p |
| activeDirectory\* | string   example: /tv/ |
| activeLanguageProfileId | number   example: 1 |
| activeAnimeProfileId | number   nullable: true |
| activeAnimeLanguageProfileId | number   nullable: true |
| activeAnimeProfileName | string   example: 720p/1080p   nullable: true |
| activeAnimeDirectory | string   nullable: true |
| is4k\* | boolean   example: false |
| enableSeasonFolders\* | boolean   example: false |
| isDefault\* | boolean   example: false |
| externalUrl | string   example: http://radarr.example.com |
| syncEnabled | boolean   example: false |
| preventSearch | boolean   example: false |

}

{

| id | number   example: 1 |
| --- | --- |
| label | string   example: A Label |

}

{

| initialized | boolean   example: false |
| --- | --- |

}

{

| id\* | number   example: 1234 |
| --- | --- |
| mediaType\* | string |
| popularity | number   example: 10 |
| posterPath | string |
| backdropPath | string |
| voteCount | number |
| voteAverage | number |
| genreIds |  |
| overview | string   example: Overview of the movie |
| originalLanguage | string   example: en |
| title\* | string   example: Movie Title |
| originalTitle | string   example: Original Movie Title |
| releaseDate | string |
| adult | boolean   example: false |
| video | boolean   example: false |
| mediaInfo |  |

}

{

| id | number   example: 1234 |
| --- | --- |
| mediaType | string |
| popularity | number   example: 10 |
| posterPath | string |
| backdropPath | string |
| voteCount | number |
| voteAverage | number |
| genreIds |  |
| overview | string   example: Overview of the movie |
| originalLanguage | string   example: en |
| name | string   example: TV Show Name |
| originalName | string   example: Original TV Show Name |
| originCountry |  |
| firstAirDate | string |
| mediaInfo |  |

}

{

| id | number   example: 12345 |
| --- | --- |
| profilePath | string |
| adult | boolean   example: false |
| mediaType | string   default: person |
| knownFor |  |

}

{

| id | number   example: 1 |
| --- | --- |
| name | string   example: Adventure |

}

{

| id | number   example: 1 |
| --- | --- |
| logo\_path | string   nullable: true |
| name | string |

}

{

| id | number   example: 1 |
| --- | --- |
| logoPath | string   nullable: true |
| originCountry | string |
| name | string |

}

{

| id | number   example: 1 |
| --- | --- |
| logoPath | string   nullable: true |
| originCountry | string |
| name | string |

}

{

| id | number   example: 123   readOnly: true |
| --- | --- |
| imdbId | string   example: tt123 |
| adult | boolean |
| backdropPath | string |
| posterPath | string |
| budget | number   example: 1000000 |
| genres |  |
| homepage | string |
| relatedVideos |  |
| originalLanguage | string |
| originalTitle | string |
| overview | string |
| popularity | number |
| productionCompanies |  |
| productionCountries |  |
| releaseDate | string |
| releases |  |
| revenue | number   nullable: true |
| runtime | number |
| spokenLanguages |  |
| status | string |
| tagline | string |
| title | string |
| video | boolean |
| voteAverage | number |
| voteCount | number |
| credits |  |
| collection |  |
| externalIds |  |
| mediaInfo |  |
| watchProviders |  |

}

{

| id | number |
| --- | --- |
| name | string |
| airDate | string   nullable: true |
| episodeNumber | number |
| overview | string |
| productionCode | string |
| seasonNumber | number |
| showId | number |
| stillPath | string   nullable: true |
| voteAverage | number |
| voteCount | number |

}

{

| id | number |
| --- | --- |
| airDate | string   nullable: true |
| episodeCount | number |
| name | string |
| overview | string |
| posterPath | string |
| seasonNumber | number |
| episodes |  |

}

{

| id | number   example: 123 |
| --- | --- |
| backdropPath | string |
| posterPath | string |
| contentRatings |  |
| createdBy |  |
| episodeRunTime |  |
| firstAirDate | string |
| genres |  |
| homepage | string |
| inProduction | boolean |
| languages |  |
| lastAirDate | string |
| lastEpisodeToAir |  |
| name | string |
| nextEpisodeToAir |  |
| networks |  |
| numberOfEpisodes | number |
| numberOfSeason | number |
| originCountry |  |
| originalLanguage | string |
| originalName | string |
| overview | string |
| popularity | number |
| productionCompanies |  |
| productionCountries |  |
| spokenLanguages |  |
| seasons |  |
| status | string |
| tagline | string |
| type | string |
| voteAverage | number |
| voteCount | number |
| credits |  |
| externalIds |  |
| keywords |  |
| mediaInfo |  |
| watchProviders |  |

}

{

| id\* | number   example: 123   readOnly: true |
| --- | --- |
| status\* | number   example: 0   readOnly: true  Status of the request. 1 = PENDING APPROVAL, 2 = APPROVED, 3 = DECLINED |
| media |  |
| createdAt | string   example: 2020-09-12T10:00:27.000Z   readOnly: true |
| updatedAt | string   example: 2020-09-12T10:00:27.000Z   readOnly: true |
| requestedBy |  |
| modifiedBy |  |
| is4k | boolean   example: false |
| serverId | number |
| profileId | number |
| rootFolder | string |

}

{

| id | number   readOnly: true |
| --- | --- |
| tmdbId | number   readOnly: true |
| tvdbId | number   readOnly: true   nullable: true |
| status | number   example: 0  Availability of the media. 1 = `UNKNOWN`, 2 = `PENDING`, 3 = `PROCESSING`, 4 = `PARTIALLY_AVAILABLE`, 5 = `AVAILABLE` |
| requests |  |
| createdAt | string   example: 2020-09-12T10:00:27.000Z   readOnly: true |
| updatedAt | string   example: 2020-09-12T10:00:27.000Z   readOnly: true |

}

{

| id | number   example: 123 |
| --- | --- |
| castId | number   example: 1 |
| character | string   example: Some Character Name |
| creditId | string |
| gender | number |
| name | string   example: Some Persons Name |
| order | number |
| profilePath | string   nullable: true |

}

{

| id | number   example: 123 |
| --- | --- |
| creditId | string |
| gender | number |
| name | string   example: Some Persons Name |
| job | string |
| department | string |
| profilePath | string   nullable: true |

}

{

| facebookId | string   nullable: true |
| --- | --- |
| freebaseId | string   nullable: true |
| freebaseMid | string   nullable: true |
| imdbId | string   nullable: true |
| instagramId | string   nullable: true |
| tvdbId | number   nullable: true |
| tvrageId | number   nullable: true |
| twitterId | string   nullable: true |

}

{

| id | number   example: 1 |
| --- | --- |
| name | string   example: 720p/1080p |

}

{

| page | number   example: 1 |
| --- | --- |
| pages | number   example: 10 |
| results | number   example: 100 |

}

{

| enabled | boolean   example: false |
| --- | --- |
| types | number   example: 2 |
| options |  |

}

{

| enabled | boolean   example: false |
| --- | --- |
| types | number   example: 2 |
| options |  |

}

{

| enabled | boolean   example: false |
| --- | --- |
| types | number   example: 2 |

}

{

| enabled | boolean   example: false |
| --- | --- |
| types | number   example: 2 |
| options |  |

}

{

| enabled | boolean   example: false |
| --- | --- |
| types | number   example: 2 |
| options |  |

}

{

| enabled | boolean   example: false |
| --- | --- |
| types | number   example: 2 |
| options |  |

}

{

| enabled | boolean   example: false |
| --- | --- |
| types | number   example: 2 |
| options |  |

}

{

| enabled | boolean   example: false |
| --- | --- |
| types | number   example: 2 |
| options |  |

}

{

| enabled | boolean   example: false |
| --- | --- |
| types | number   example: 2 |
| options |  |

}

{

| enabled | boolean   example: false |
| --- | --- |
| types | number   example: 2 |
| options |  |

}

{

| id | string   example: job-name |
| --- | --- |
| type | stringEnum: |
| interval | stringEnum: |
| name | string   example: A Job Name |
| nextExecutionTime | string   example: 2020-09-02T05:02:23.000Z |
| running | boolean   example: false |

}

{

| id | number   example: 1 |
| --- | --- |
| name | string |
| deathday | string |
| knownForDepartment | string |
| alsoKnownAs |  |
| gender | string |
| biography | string |
| popularity | string |
| placeOfBirth | string |
| profilePath | string |
| adult | boolean |
| imdbId | string |
| homepage | string |

}

{

| id | number   example: 1 |
| --- | --- |
| originalLanguage | string |
| episodeCount | number |
| overview | string |
| originCountry |  |
| originalName | string |
| voteCount | number |
| name | string |
| mediaType | string |
| popularity | number |
| creditId | string |
| backdropPath | string |
| firstAirDate | string |
| voteAverage | number |
| genreIds |  |
| posterPath | string |
| originalTitle | string |
| video | boolean |
| title | string |
| adult | boolean |
| releaseDate | string |
| character | string |
| mediaInfo |  |

}

{

| id | number   example: 1 |
| --- | --- |
| originalLanguage | string |
| episodeCount | number |
| overview | string |
| originCountry |  |
| originalName | string |
| voteCount | number |
| name | string |
| mediaType | string |
| popularity | number |
| creditId | string |
| backdropPath | string |
| firstAirDate | string |
| voteAverage | number |
| genreIds |  |
| posterPath | string |
| originalTitle | string |
| video | boolean |
| title | string |
| adult | boolean |
| releaseDate | string |
| department | string |
| job | string |
| mediaInfo |  |

}

{

| id | number   example: 1 |
| --- | --- |
| name | string   example: anime |

}

{

| englishName | string   example: English   nullable: true |
| --- | --- |
| iso\_639\_1 | string   example: en |
| name | string   example: English |

}

{

| id | number   example: 123 |
| --- | --- |
| name | string   example: A Movie Collection |
| overview | string   example: Overview of collection |
| posterPath | string |
| backdropPath | string |
| parts |  |

}

{

| title | string   example: COVID-25 |
| --- | --- |
| sortTitle | string   example: covid 25 |
| seasonCount | number   example: 1 |
| status | string   example: upcoming |
| overview | string   example: The thread is picked up again by Marianne Schmidt which ... |
| network | string   example: CBS |
| airTime | string   example: 02:15 |
| images |  |
| remotePoster | string   example: https://artworks.thetvdb.com/banners/posters/5c8f116129983.jpg |
| seasons |  |
| year | number   example: 2015 |
| path | string |
| profileId | number |
| languageProfileId | number |
| seasonFolder | boolean |
| monitored | boolean |
| useSceneNumbering | boolean |
| runtime | number |
| tvdbId | number   example: 12345 |
| tvRageId | number |
| tvMazeId | number |
| firstAired | string |
| lastInfoSync | string   nullable: true |
| seriesType | string |
| cleanTitle | string |
| imdbId | string |
| titleSlug | string |
| certification | string |
| genres |  |
| tags |  |
| added | string |
| ratings |  |
| qualityProfileId | number |
| id | number   nullable: true |
| rootFolderPath | string   nullable: true |
| addOptions |  |

}

{

| notificationTypes |  |
| --- | --- |
| emailEnabled | boolean |
| pgpKey | string   nullable: true |
| discordEnabled | boolean |
| discordEnabledTypes | number   nullable: true |
| discordId | string   nullable: true |
| pushbulletAccessToken | string   nullable: true |
| pushoverApplicationToken | string   nullable: true |
| pushoverUserKey | string   nullable: true |
| pushoverSound | string   nullable: true |
| telegramEnabled | boolean |
| telegramBotUsername | string   nullable: true |
| telegramChatId | string   nullable: true |
| telegramSendSilently | boolean   nullable: true |

}

{

| discord | number |
| --- | --- |
| email | number |
| pushbullet | number |
| pushover | number |
| slack | number |
| telegram | number |
| webhook | number |
| webpush | number |

}

\[{

| iso\_3166\_1 | string |
| --- | --- |
| link | string |
| buy |  |
| flatrate |  |

}\]

{

| displayPriority | number |
| --- | --- |
| logoPath | string |
| id | number |
| name | string |

}

{

| id | number   example: 1 |
| --- | --- |
| issueType | number   example: 1 |
| media |  |
| createdBy |  |
| modifiedBy |  |
| comments |  |

}

{

| id | number   example: 1 |
| --- | --- |
| type\* | number   example: 1 |
| title\* | string   nullable: true |
| isBuiltIn | boolean |
| enabled\* | boolean |
| data\* | string   example: 1234   nullable: true |

}

{

| iso\_3166\_1 | string |
| --- | --- |
| english\_name | string |
| native\_name | string |

}