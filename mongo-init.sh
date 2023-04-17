set -e

mongosh << EOF
db = db.getSiblingDB('$MONGO_DB_NAME')

db.createUser({
  user: '$MONGO_USER',
  pwd: '$MONGO_PASSWORD',
  roles: [{ role: 'readWrite', db: '$MONGO_DB_NAME' }],
});

EOF