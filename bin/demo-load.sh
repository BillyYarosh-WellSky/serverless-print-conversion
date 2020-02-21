for i in `seq 1 100`;
        do
                nohup bin/demo.sh $i &
		echo $i
        done    
