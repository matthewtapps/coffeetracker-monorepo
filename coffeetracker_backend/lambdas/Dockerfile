FROM rust:1.78.0 as builder

ARG binary
WORKDIR /usr/src/
COPY . .
# Parent build context passed to docker build command to allow shared files to be copied into the child image
COPY --from=shared . /usr/shared/
RUN cargo install --bin ${binary} --path .

FROM gcr.io/distroless/cc-debian12
ARG binary
ARG log_level
ENV RUST_LOG=${log_level}
ENV TABLE_NAME=espressoshots
COPY --from=builder /usr/local/cargo/bin/${binary} /asset-output/bootstrap
ENTRYPOINT [ "/asset-output/bootstrap" ]
