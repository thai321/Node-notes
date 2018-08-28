### Networking traffic capturing
- Filter and write to pcap file: `tshark -r name-of-pcap-file.pcap -Y "bacnet" -w new_pcap_file.pcap -F pcap`
- merge all pcap files: `mergecap -w capture_name.pcap *other_name*`
- Capturing traffic on a interface: 
  - `tcpdump -i eth0 -s 1500 -w /var/log/name.pcap &`
  - `dumpcap -i eth0 -f "host 192.168.1.15" -w name.pcap`
