class Api::V1::FetchController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create

    symbolsData = []

    symbolsFirst = params["_json"][0...5]
    puts symbolsFirst.length
    symbolsSecond = params["_json"][5...10]
    puts symbolsSecond.length
    symbolsThird = params["_json"][10]
    puts symbolsThird.length

    key1 = "2NSG0O0E1I8ESDEZ"
    key2 = "GPVI77SN18N0LB1J"
    key3 = "7FTS2A6T4HRYU6MC"

    endpoint = "https://www.alphavantage.co/"

    symbolsFirst.each do |symbol| 
      request_url = "#{endpoint}query?function=GLOBAL_QUOTE&symbol=#{symbol}&apikey=#{key1}"
      response_raw = HTTParty.get(request_url)
      symbolsData << response_raw["Global Quote"]
    end

    n = 60
    60.times do 
      puts "#{n} seconds left"
      n = n - 1
      sleep 1
    end
    
    symbolsSecond.each do |symbol| 
      request_url = "#{endpoint}query?function=GLOBAL_QUOTE&symbol=#{symbol}&apikey=#{key2}"
      response_raw = HTTParty.get(request_url)
      symbolsData << response_raw["Global Quote"]
    end
    
    n = 60
    60.times do 
      puts "#{n} seconds left"
      n = n - 1
      sleep 1
    end

    request_url = "#{endpoint}query?function=GLOBAL_QUOTE&symbol=#{symbolsThird}&apikey=#{key3}"
    response_raw = HTTParty.get(request_url)

    binding.pry

    symbolsData << response_raw["Global Quote"]
    

    # # The region you are interested in
    # endpoint = "webservices.amazon.com"

    # request_uri = "/onca/xml"

    # params = {
    #   "Service" => "AWSECommerceService",
    #   "Operation" => "ItemSearch",
    #   "AWSAccessKeyId" => "#{@access_key_id}",
    #   "AssociateTag" => "#{@associate_tag}",
    #   "Condition" => "New",
    #   "RelationshipType" => "AuthorityTitle",
    #   "SearchIndex" => "All",
    #   "Keywords" => "#{keywords}",
    #   "ResponseGroup" => "Large,RelatedItems,Reviews"
    # }

    # # Set current timestamp if not set
    # params["Timestamp"] = Time.now.gmtime.iso8601 if !params.key?("Timestamp")

    # # Generate the canonical query
    # canonical_query_string = params.sort.collect do |key, value|
    #   [URI.escape(key.to_s, Regexp.new("[^#{URI::PATTERN::UNRESERVED}]")), URI.escape(value.to_s, Regexp.new("[^#{URI::PATTERN::UNRESERVED}]"))].join('=')
    # end.join('&')

    # # Generate the string to be signed
    # string_to_sign = "GET\n#{endpoint}\n#{request_uri}\n#{canonical_query_string}"

    # # Generate the signature required by the Product Advertising API
    # signature = Base64.encode64(OpenSSL::HMAC.digest(OpenSSL::Digest.new('sha256'), @secret_key, string_to_sign)).strip()

    # # Generate the signed URL
    # request_url = "https://#{endpoint}#{request_uri}?#{canonical_query_string}&Signature=#{URI.escape(signature, Regexp.new("[^#{URI::PATTERN::UNRESERVED}]"))}"

    # response_raw = HTTParty.get(request_url)

    
    # response = response_raw["ItemSearchResponse"]["Items"]["Item"] ?response_raw["ItemSearchResponse"]["Items"]["Item"] : nil
    
    # if response
    #   response.each do |item|
    #     if item["ItemAttributes"]["ReleaseDate"]
    #       release_date = Date.parse(item["ItemAttributes"]["ReleaseDate"])
    #       release_date_human = release_date.strftime('%m/%d/%Y')
    #       item["ItemAttributes"]["ReleaseDateHuman"] = release_date_human
    #     end
    #   end
    # end

    # return response

    render json: {
      fetchedData: symbolsData
    }
  end

end