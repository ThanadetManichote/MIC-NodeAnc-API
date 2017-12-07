# Node Anc

This is a delivery tool for anc.


### Specfication

- Require Node v8.9.1
- Require Npm  v5.5.1
- PHP 5.6


### Usage && Running

You can use Docker with path `mic-nodeanc-api/docker`

```sh
    $ sh start_script.sh
```

and you can use without docker by `mic-nodeanc-api/`

```sh
    $ npm install
    $ npm start
```

### Config Env

- You can config env in docker with path `mic-nodeanc-api/docker/Dockerfile`

- You can config env without docker with path `mic-nodeanc-api/package.json`

### Monitor

You can monitor. you run command before request everything.

```sh
    $ node server.js | php monitor.php echo_log
```