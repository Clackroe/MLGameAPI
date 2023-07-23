import Dockerode from "dockerode";

export function testFunc() {
  const docker = new Dockerode();

  let container;

  docker
    .createContainer({
      Image: "ubuntu",
      AttachStdin: false,
      AttachStdout: true,
      AttachStderr: true,
      Tty: true,
      Cmd: ["/bin/bash", "-c", "tail -f /var/log/dmesg"],
      OpenStdin: false,
      StdinOnce: false,
    })
    .then((c) => {
      container = c;
      return container.start();
    })
    .then(() => {
      return container
        .resize({
          h: process.stdout.rows,
          w: process.stdout.columns,
        })
        .then(() => {
          return container.stop();
        })
        .then(() => {
          return container.remove();
        })
        .then(() => {
          console.log("container removed");
        })
        .catch((err) => {
          console.log(err);
        });
    });
}
