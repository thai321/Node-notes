### Networking traffic capturing
- Filter and write to pcap file: `tshark -r name-of-pcap-file.pcap -Y "bacnet" -w new_pcap_file.pcap -F pcap`
- merge all pcap files: `mergecap -w capture_name.pcap *name*`
- Capturing traffic on a interface: `tcpdump -i etho0 -s 1500 -w /var/log/name.pcap &`
