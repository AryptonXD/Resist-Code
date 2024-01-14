const { ShardingManager } = require('discord.js');
const config = require('./config.json');

const manager = new ShardingManager('./index.js', {
  token: config.token,
  totalShards: 'auto',
  shardList: 'auto',
  respawn: true,
  timeout: 60000,
  shardArgs: ['--ansi', '--color'],
  execArgv: ['--inspect=8989'],
});

manager.on('shardCreate', (shard) => {
  console.log(`Launched shard ${shard.id}`);
});

manager.spawn().catch(console.error);
