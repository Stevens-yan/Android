export function externalPush(route) {
  return {
    type: 'externalPush',
    route
  };
}

export function externalPop() {
  return {
    type: 'externalPop'
  };
}

export function majorPush(route) {
  return {
    type: 'majorPush',
    route
  };
}

export function majorPop() {
  return {
    type: 'majorPop'
  };
}

export function majorTab(curTab) {
  return {
    type: 'navigationTab',
    curTab
  };
}

