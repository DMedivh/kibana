#!/usr/bin/env bash

set -e

# move to Kibana root
cd "$(dirname "$0")/.."

./src/dev/ci_setup/load_bootstrap_cache.sh;

case "$JOB" in
kibana-intake)
  ./test/scripts/jenkins_unit.sh
  ;;
kibana-ciGroup*)
  export CI_GROUP="${JOB##kibana-ciGroup}"
  ./test/scripts/jenkins_ci_group.sh
  ;;
x-pack-intake)
  ./test/scripts/jenkins_xpack.sh
  ;;
x-pack-ciGroup*)
  export CI_GROUP="${JOB##x-pack-ciGroup}"
  ./test/scripts/jenkins_xpack_ci_group.sh
  ;;
*)
  echo "JOB '$JOB' is not implemented."
  exit 1
  ;;
esac
