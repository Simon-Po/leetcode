function busiestServers(
  k: number,
  arrival: number[],
  load: number[],
): number[] {
  const servers = [];
  for (let i = 0; i <= k; i++) {
    servers.push({ index: i, requestsHandled: 0, busy: false });
  }

  for (let i = 0; i < arrival.length; i++) {
    const arrivalTime = arrival[i]!;
    const currentRequestLoad = load[i]!;

    if(servers[i].busy) {
      let serverFound = false
      let serverToUse;
      while(!serverFound) {
        let next = (i+1) % arrival.length
        if(!servers[next].busy){
         serverToUse = next
          break;
        }
      }


      }

  }
}
