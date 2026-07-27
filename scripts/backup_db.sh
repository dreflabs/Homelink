#!/usr/bin/env bash
set -e

# ==============================================================================
# HomeLink 2.0 Database Backup & Cloudflare R2 Sync Script
# ==============================================================================

BACKUP_DIR="${BACKUP_DIR:-/tmp/homelink_backups}"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILENAME="homelink_db_${TIMESTAMP}.dump"
BACKUP_PATH="${BACKUP_DIR}/${BACKUP_FILENAME}"

mkdir -p "${BACKUP_DIR}"

echo "[$(date -u)] Starting PostgreSQL database backup..."

if [ -n "${DATABASE_URL}" ]; then
  pg_dump -Fc "${DATABASE_URL}" > "${BACKUP_PATH}"
else
  echo "Error: DATABASE_URL environment variable is not set." >&2
  exit 1
fi

echo "[$(date -u)] Database dump created successfully at ${BACKUP_PATH}"

# Upload to R2 if S3/AWS CLI is configured
if command -v aws >/dev/null 2>&1 && [ -n "${R2_BUCKET_NAME}" ]; then
  echo "[$(date -u)] Uploading backup to Cloudflare R2 bucket: ${R2_BUCKET_NAME}..."
  aws s3 cp "${BACKUP_PATH}" "s3://${R2_BUCKET_NAME}/db/${BACKUP_FILENAME}" \
    --endpoint-url "https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com"
  echo "[$(date -u)] R2 upload complete."
else
  echo "[$(date -u)] R2 upload skipped (aws CLI or R2_BUCKET_NAME not configured)."
fi

# Prune local backups older than 7 days
echo "[$(date -u)] Pruning local backups older than 7 days..."
find "${BACKUP_DIR}" -type f -name "homelink_db_*.dump" -mtime +7 -exec rm -f {} \;

echo "[$(date -u)] Database backup workflow completed."
